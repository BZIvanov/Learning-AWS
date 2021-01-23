# Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Project folders and files additional info - BI (Biser Ivanov)

- **cdk.json** - it will tell AWS how to start our stack, not our app. This fill is the entry point and it will call the bin/cdk.ts.
- **bin/cdk.ts** - this file will create our stack.
- **lib/cdk-stack.ts** - here we define our resources.

## Working with services (BI)

When we want to use another service we need to install it. The command usually follows the same pattern, just the name of the service is different. Example _npm install @aws-cdk/aws-s3_

We also need to install the deployment package for each service which would look like _npm install @aws-cdk/aws-s3-deployment_

## Additional info (BI)

After we using typescript, you can always ctrl+click and check more details about services we use and their parameters or anything else.

## Deployment

First run **cdk bootstrap --profile profile-name** in case you are going to deploy some assets. This command is executed only once to set our environment. Environment is the combination of account id and region as you can see in the console after the bootstrap command is finished. If you then also check CloudFormation from the managmenet console in aws you should see your stack.

Next run **cdk synth** to create your CloudFormation template. **cdk.out** folder will be created, you can review the content of what this command did.

Next run **cdk deploy --profile username** to access AWS with profile different than the default one. Check for _aws configure_ for additional info on how to configure named profiles.

With **cdk diff** we can compare our local changes with already deployed changes.

To delete the deployed stack, run **cdk destroy --profile username**.

## Important notes

It is important to have all dependencies in the package.json with the same version (in this example 1.86.0).
