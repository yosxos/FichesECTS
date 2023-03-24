import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

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

    //create a lambda function to connect to the database and run Select query
    const FormationGet = new NodejsFunction(this, 'FormationGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:"4az0,=sVt1JH40sQZ1B4CpW4,_sYv3",
        TABLE_NAME:"Formation",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });
    //create a lambda function to connect to the database and run edit query
    const FormationEdit = new NodejsFunction(this, 'FormationEdit', {
      entry: join(__dirname, '../lambdas/Edit_Formation.ts'),
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:"4az0,=sVt1JH40sQZ1B4CpW4,_sYv3",
        TABLE_NAME:"Formation",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });


    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(FormationGet);
    instance.grantConnect(FormationGet);
    instance.connections.allowDefaultPortFrom(FormationEdit);
    instance.grantConnect(FormationEdit);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(FormationGet.connections,ec2.Port.tcp(3306));
    instance.connections.allowFrom(FormationEdit.connections,ec2.Port.tcp(3306));

  
    //Create a new API Gateway  
    const api = new apigateway.RestApi(this, 'FichesECTS', {
      restApiName: 'FichesECTS Service',
      description: 'This service serves FichesECTS.',
    });
    //Create a new resource
    const formation = api.root.addResource('formation');
    const formationEdit = formation.addResource('edit');
    //Create a new method
    const formationGetIntegration = new apigateway.LambdaIntegration(FormationGet);
    formation.addMethod('GET', formationGetIntegration);
    const formationEditIntegration = new apigateway.LambdaIntegration(FormationEdit);
    formationEdit.addMethod('PUT', formationEditIntegration);
    formationEdit.addMethod('POST', formationEditIntegration);
    formationEdit.addMethod('DELETE', formationEditIntegration);



    /** ControleGET */
    
    //create a lambda function to connect to the database and run Select query
    const ControleGet = new NodejsFunction(this, 'ControleGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:"4az0,=sVt1JH40sQZ1B4CpW4,_sYv3",
        TABLE_NAME:"Controle",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });

    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(ControleGet);
    instance.grantConnect(ControleGet);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(ControleGet.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const controle = api.root.addResource('controle');
    //Create a new method
    const controleGetIntegration = new apigateway.LambdaIntegration(ControleGet);
    controle.addMethod('GET', controleGetIntegration);

    /** UeGET */

    //create a lambda function to connect to the database and run Select query
    const UeGet = new NodejsFunction(this, 'UeGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:"4az0,=sVt1JH40sQZ1B4CpW4,_sYv3",
        TABLE_NAME:"UE",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });

    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(UeGet);
    instance.grantConnect(UeGet);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(UeGet.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const ue = api.root.addResource('ue');
    //Create a new method
    const UeGetIntegration = new apigateway.LambdaIntegration(UeGet);
    ue.addMethod('GET', UeGetIntegration);
  

    /** MatiereGet */

    //create a lambda function to connect to the database and run Select query
    const MatiereGet = new NodejsFunction(this, 'MatiereGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:"4az0,=sVt1JH40sQZ1B4CpW4,_sYv3",
        TABLE_NAME:"Matiere",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });

    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(MatiereGet);
    instance.grantConnect(MatiereGet);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(MatiereGet.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const matiere = api.root.addResource('matiere');
    //Create a new method
    const MatiereGetIntegration = new apigateway.LambdaIntegration(MatiereGet);
    matiere.addMethod('GET', MatiereGetIntegration);
  
    /** ResponsableFormationGet */

    //create a lambda function to connect to the database and run Select query
    const ResponsableFormationGet = new NodejsFunction(this, 'ResponsableFormationGet', {
      entry: join(__dirname, '../lambdas/GetIdUSR.ts'),
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:"4az0,=sVt1JH40sQZ1B4CpW4,_sYv3",
        TABLE_NAME:"Responsable_formation",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });

    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(ResponsableFormationGet);
    instance.grantConnect(ResponsableFormationGet);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(ResponsableFormationGet.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const responsableFormation = api.root.addResource('responsableFormation');
    //Create a new method
    const ResponsableFormationGetIntegration = new apigateway.LambdaIntegration(ResponsableFormationGet);
    responsableFormation.addMethod('GET', ResponsableFormationGetIntegration);


    /** UeFormationGet */
    const FormationUeGet = new NodejsFunction(this, 'UeFormationGet', {
      entry: join(__dirname, '../lambdas/GetIdFORM.ts'),
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:"4az0,=sVt1JH40sQZ1B4CpW4,_sYv3",
        TABLE_NAME:"Formation_UE",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });
    
    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(FormationUeGet);
    instance.grantConnect(FormationUeGet);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(FormationUeGet.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const formationUe = api.root.addResource('formationUe');
    //Create a new method
    const FormationUeGetIntegration = new apigateway.LambdaIntegration(FormationUeGet);
    formationUe.addMethod('GET', FormationUeGetIntegration);

    /** MatiereUeGet */
    const UeMatiereGet = new NodejsFunction(this, 'MatiereUeGet', {
      entry: join(__dirname, '../lambdas/GetIdMAT.ts'),
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:"4az0,=sVt1JH40sQZ1B4CpW4,_sYv3",
        TABLE_NAME:"Matiere_UE",

      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });

    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(UeMatiereGet);
    instance.grantConnect(UeMatiereGet);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(UeMatiereGet.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const ueMatiere = api.root.addResource('ueMatiere');
    //Create a new method
    const UeMatiereGetIntegration = new apigateway.LambdaIntegration(UeMatiereGet);
    ueMatiere.addMethod('GET', UeMatiereGetIntegration);

    

    /**Users GET */
    const UsersGet = new NodejsFunction(this, 'UsersGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:"4az0,=sVt1JH40sQZ1B4CpW4,_sYv3",
        TABLE_NAME:"users",

      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });

    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(UsersGet);
    instance.grantConnect(UsersGet);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(UsersGet.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const users = api.root.addResource('users');
    //Create a new method
    const UsersGetIntegration = new apigateway.LambdaIntegration(UsersGet);
    users.addMethod('GET', UsersGetIntegration);

    /**Admin Get */
    const AdminGet = new NodejsFunction(this, 'AdminGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:"4az0,=sVt1JH40sQZ1B4CpW4,_sYv3",
        TABLE_NAME:"admin",
      
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });

    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(AdminGet);
    instance.grantConnect(AdminGet);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(AdminGet.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const admin = api.root.addResource('admin');
    //Create a new method
    const AdminGetIntegration = new apigateway.LambdaIntegration(AdminGet);
    admin.addMethod('GET', AdminGetIntegration);
  
  }
}
  

