import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);



// creating a new VPC/ 
const vpc = new ec2.Vpc(this, 'VPC', {
   cidr: '10.0.0.0/16',
   maxAzs: 2,
   natGateways: 0,
   subnetConfiguration: [
     {
       cidrMask: 24,
     name: 'public-subnet-1',
    subnetType: ec2.SubnetType.PUBLIC,
     },
     {
       cidrMask: 24,
       name: 'isolated-subnet-1',
       subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
     },
   ],
 });
 // creating a new security group for the database
 const dbSecurityGroup = new ec2.SecurityGroup(this, 'DBSecurityGroup', {
  vpc,
  securityGroupName: 'DBSecurityGroup',
  description: 'Allow inbound traffic to the database from anywhere',
});

dbSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(3306), 'Allow inbound traffic to the database from anywhere');

    const instance = new rds.DatabaseInstance(this, 'MyDatabase', {
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_25,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.MICRO,
      ),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
        
      },
      allocatedStorage: 20,
      deletionProtection: false,
      backupRetention: cdk.Duration.days(7),
      databaseName: 'FicheECTS',
      credentials: rds.Credentials.fromGeneratedSecret('admin'),
      multiAz: false,
      instanceIdentifier: 'FicheECTS',
      securityGroups: [dbSecurityGroup],
      port: 3306,
      
    });

    new cdk.CfnOutput(this, 'dbEndpoint', {
      value: instance.instanceEndpoint.hostname,
    });

    new cdk.CfnOutput(this, 'secretName', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: instance.secret?.secretName!,
    });







  }
}


