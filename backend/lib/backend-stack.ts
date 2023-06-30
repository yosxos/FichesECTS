import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { AllowedMethods } from 'aws-cdk-lib/aws-cloudfront';
import * as sm from 'aws-cdk-lib/aws-secretsmanager';
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
//creating a new secret manager for the database
const secret = sm.Secret.fromSecretNameV2(
  this, "MySecret", "BackendStackMyDatabaseSecre-xFHZifa8cihF"
)
// Retrieve the password from the secret
const password = "I--bJ.hQrIAp-4E5GcuSTbodStOkL5";



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
    //Amazon Cognito user pool
    const userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'PFE',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true
        },
        familyName: {
          required: true,
          mutable: true
        },
        givenName: {
          required: true,
          mutable: true
        }
      },

    });
    //add a username attribute to the user pool


    
    //User pool client for the api
    const userPoolClient = new cognito.UserPoolClient(this, 'PFEClient', {
      userPool,
      userPoolClientName: 'PFE-Users-client',
      generateSecret: false,
      authFlows: {
        userPassword: true,
        userSrp: true
        
      }
    });
    //Define the authorize for your apiGateway
    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'MyAuthorizer', {
     cognitoUserPools: [userPool],
      authorizerName: 'my-authorizer',
      identitySource: 'method.request.header.Authorization',
    

    });
    //create a lambda function to connect to the database and run Select query
    const FormationGet = new NodejsFunction(this, 'FormationGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_16_X,
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        // db password from secret manager key :password
        DB_PASSWORD:password,
        TABLE_NAME:"Formation",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });
    //create a lambda function to connect to the database and run edit query
    const FormationEdit = new NodejsFunction(this, 'FormationEdit', {
      entry: join(__dirname, '../lambdas/Edit_Formation.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
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

    //Create a new apiGateway
    const api = new apigateway.RestApi(this, 'FichesECTS', {
      restApiName: 'FichesECTS Service',
      description: 'This service serves FichesECTS.',
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ["content-type", "Authorization","Access-C","Access-Control-Allow-Origin","Access-Control-Allow-Headers","Access-Control-Allow-Methods"]
      },
    });
    //Create a new resource
    const formation = api.root.addResource('formation');
    const formationEdit = formation.addResource('edit');
    //Create a new method
    const formationGetIntegration = new apigateway.LambdaIntegration(FormationGet,);
    
    formation.addMethod('GET', formationGetIntegration);
    
    const formationEditIntegration = new apigateway.LambdaIntegration(FormationEdit);
    formationEdit.addMethod('PUT', formationEditIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });
    formationEdit.addMethod('POST', formationEditIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });
    formationEdit.addMethod('DELETE', formationEditIntegration, {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });


    /** ControleGET */
    
    //create a lambda function to connect to the database and run Select query
    const ControleGet = new NodejsFunction(this, 'ControleGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
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
    /** ControleEDIT */
    //create a lambda function to connect to the database and run edit query
    const ControleEdit = new NodejsFunction(this, 'ControleEdit', {
      entry: join(__dirname, '../lambdas/Edit_Controle.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
        TABLE_NAME:"Controle",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });

    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(ControleEdit);
    instance.grantConnect(ControleEdit);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(ControleEdit.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const controleEdit = controle.addResource('edit');
    //Create a new method
    const controleEditIntegration = new apigateway.LambdaIntegration(ControleEdit);
    controleEdit.addMethod('PUT', controleEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    controleEdit.addMethod('POST', controleEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    controleEdit.addMethod('DELETE', controleEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });




    /** UeGET */

    //create a lambda function to connect to the database and run Select query
    const UeGet = new NodejsFunction(this, 'UeGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
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
    /** UeEDIT */
    //create a lambda function to connect to the database and run edit query
    const UeEdit = new NodejsFunction(this, 'UeEdit', {
      entry: join(__dirname, '../lambdas/Edit_UE.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
        TABLE_NAME:"UE",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });

    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(UeEdit);
    instance.grantConnect(UeEdit);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(UeEdit.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const ueEdit = ue.addResource('edit');
    //Create a new method
    const ueEditIntegration = new apigateway.LambdaIntegration(UeEdit);
    ueEdit.addMethod('PUT', ueEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    ueEdit.addMethod('POST', ueEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    ueEdit.addMethod('DELETE', ueEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });



    /** MatiereGet */

    //create a lambda function to connect to the database and run Select query
    const MatiereGet = new NodejsFunction(this, 'MatiereGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
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
  
    /** MatiereEDIT */
    //create a lambda function to connect to the database and run edit query
    const MatiereEdit = new NodejsFunction(this, 'MatiereEdit', {
      entry: join(__dirname, '../lambdas/Edit_Matiere.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
        TABLE_NAME:"Matiere",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),

    });
    
    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(MatiereEdit);
    instance.grantConnect(MatiereEdit);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(MatiereEdit.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const matiereEdit = matiere.addResource('edit');
    //Create a new method
    const matiereEditIntegration = new apigateway.LambdaIntegration(MatiereEdit);
    matiereEdit.addMethod('PUT', matiereEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    matiereEdit.addMethod('POST', matiereEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    matiereEdit.addMethod('DELETE', matiereEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });



    /** ResponsableFormationGet */

    //create a lambda function to connect to the database and run Select query
    const ResponsableFormationGet = new NodejsFunction(this, 'ResponsableFormationGet', {
      entry: join(__dirname, '../lambdas/GetIdUSR.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_16_X,
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
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

    /** ResponsableFormationEDIT */
    //create a lambda function to connect to the database and run edit query
    const ResponsableFormationEdit = new NodejsFunction(this, 'ResponsableFormationEdit', {
      entry: join(__dirname, '../lambdas/Edit_RespForm.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
        TABLE_NAME:"Responsable_formation",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
      
    });
    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(ResponsableFormationEdit);
    instance.grantConnect(ResponsableFormationEdit);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(ResponsableFormationEdit.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const responsableFormationEdit = responsableFormation.addResource('edit');
    //Create a new method
    const responsableFormationEditIntegration = new apigateway.LambdaIntegration(ResponsableFormationEdit);
    responsableFormationEdit.addMethod('PUT', responsableFormationEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    responsableFormationEdit.addMethod('POST', responsableFormationEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    responsableFormationEdit.addMethod('DELETE', responsableFormationEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });

    /** UeFormationGet */
    const FormationUeGet = new NodejsFunction(this, 'UeFormationGet', {
      entry: join(__dirname, '../lambdas/GetIdFORM.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
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

    /** UeFormationEdit */
    const FormationUeEdit = new NodejsFunction(this, 'UeFormationEdit', {
      entry: join(__dirname, '../lambdas/Edit_UeForm.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
        TABLE_NAME:"Formation_UE",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });
    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(FormationUeEdit);
    instance.grantConnect(FormationUeEdit);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(FormationUeEdit.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const formationUeEdit = formationUe.addResource('edit');
    //Create a new method 
    const FormationUeEditIntegration = new apigateway.LambdaIntegration(FormationUeEdit);
    formationUeEdit.addMethod('PUT', FormationUeEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    formationUeEdit.addMethod('POST', FormationUeEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    formationUeEdit.addMethod('DELETE', FormationUeEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });

    /** MatiereUeGet */
    const UeMatiereGet = new NodejsFunction(this, 'MatiereUeGet', {
      entry: join(__dirname, '../lambdas/GetIdMAT.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
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

    /** MatiereUeEdit */
    const UeMatiereEdit = new NodejsFunction(this, 'MatiereUeEdit', {
      entry: join(__dirname, '../lambdas/Edit_MatiereUe.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
        TABLE_NAME:"Matiere_UE",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });
    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(UeMatiereEdit);
    instance.grantConnect(UeMatiereEdit);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(UeMatiereEdit.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const ueMatiereEdit = ueMatiere.addResource('edit');
    //Create a new method
    const UeMatiereEditIntegration = new apigateway.LambdaIntegration(UeMatiereEdit);
    ueMatiereEdit.addMethod('PUT', UeMatiereEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    ueMatiereEdit.addMethod('POST', UeMatiereEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    ueMatiereEdit.addMethod('DELETE', UeMatiereEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });

    

    /**Users GET */
    const UsersGet = new NodejsFunction(this, 'UsersGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
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

    /**Users Edit */
    const UsersEdit = new NodejsFunction(this, 'UsersEdit', {
      entry: join(__dirname, '../lambdas/Edit_Users.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
        TABLE_NAME:"users",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });
    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(UsersEdit);
    instance.grantConnect(UsersEdit);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(UsersEdit.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const usersEdit = users.addResource('edit');
    //Create a new method
    const UsersEditIntegration = new apigateway.LambdaIntegration(UsersEdit);
    usersEdit.addMethod('PUT', UsersEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    usersEdit.addMethod('POST', UsersEditIntegration );
    usersEdit.addMethod('DELETE', UsersEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });

    /**Admin Get */
    const AdminGet = new NodejsFunction(this, 'AdminGet', {
      entry: join(__dirname, '../lambdas/Get.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
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

    /**Admin Edit */
    const AdminEdit = new NodejsFunction(this, 'AdminEdit', {
      entry: join(__dirname, '../lambdas/Edit_Admin.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        DB_NAME: 'FicheECTS',
        RDS_HOST: instance.instanceEndpoint.hostname,
        DB_USER:'admin',
        DB_PASSWORD:password,
        TABLE_NAME:"admin",
      },
      vpc,
      memorySize:128,
      timeout: cdk.Duration.seconds(3),
    });
    //grant lambda function to access the database
    instance.connections.allowDefaultPortFrom(AdminEdit);
    instance.grantConnect(AdminEdit);
    //add lambda function's security group to the database security group
    instance.connections.allowFrom(AdminEdit.connections,ec2.Port.tcp(3306));
    //Create a new resource
    const adminEdit = admin.addResource('edit');
    //Create a new method
    const AdminEditIntegration = new apigateway.LambdaIntegration(AdminEdit);
    adminEdit.addMethod('PUT', AdminEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    adminEdit.addMethod('POST', AdminEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });
    adminEdit.addMethod('DELETE', AdminEditIntegration    , {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
      });

      // grant secret read for all my lambdas functions
    secret.grantRead(UsersGet);
    secret.grantRead(UsersEdit);
    secret.grantRead(AdminGet);
    secret.grantRead(AdminEdit);
    secret.grantRead(UeMatiereEdit);
    secret.grantRead(UeMatiereGet);
    secret.grantRead(FormationEdit);
    secret.grantRead(FormationGet);
    secret.grantRead(ControleEdit);
    secret.grantRead(ControleGet);
    secret.grantRead(UeGet);
    secret.grantRead(UeEdit);
    secret.grantRead(MatiereGet);
    secret.grantRead(MatiereEdit);
    secret.grantRead(ResponsableFormationGet);
    secret.grantRead(ResponsableFormationEdit);
    secret.grantRead(FormationUeGet);
    secret.grantRead(FormationUeEdit);
    



  
  }
}