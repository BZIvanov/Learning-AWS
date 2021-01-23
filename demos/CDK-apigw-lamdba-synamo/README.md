# Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Additional info added by B.Ivanov

This project is built based on this [workshop](https://cdkworkshop.com/).

## Synthesize a template from your app

AWS CDK apps are effectively only a definition of your infrastructure using code. When CDK apps are executed, they produce (or _synthesize_, in CDK parlance) an AWS CloudFormation template for each stack defined in your application.

The CDK CLI requires you to be in the same directory as your cdk.json file. If you have changed directories in your terminal, please navigate back now.

To synthesize a CDK app, use the **cdk synth** command.

## Bootstrapping an environment

The first time you deploy an AWS CDK app into an environment (account/region), you can install a “bootstrap stack”. This stack includes resources that are used in the toolkit’s operation. For example, the stack includes an S3 bucket that is used to store templates and assets during the deployment process.

You can use the **cdk bootstrap --profile some-user** command to install the bootstrap stack into an environment

## Difference between local and deployed versions

If we modified our stack’s contents, we can ask the toolkit to show us the difference between our CDK app and what’s currently deployed. This is a safe way to check what will happen once we run cdk deploy and is always good practice: **cdk diff**

## Constructs and Constructors

As you can see, the class constructors of both _CdkWorkshopStack_ and _lambda.Function_ (and many other classes in the CDK) have the signature (scope, id, props). This is because all of these classes are constructs. Constructs are the basic building block of CDK apps. They represent abstract “cloud components” which can be composed together into higher level abstractions via scopes. Scopes can include constructs, which in turn can include other constructs, etc.

Constructs are always created in the scope of another construct and must always have an identifier which must be unique within the scope it’s created. Therefore, construct initializers (constructors) will always have the following signature:

1. scope: the first argument is always the scope in which this construct is created. In almost all cases, you’ll be defining constructs within the scope of current construct, which means you’ll usually just want to pass _this_ for the first argument. Make a habit out of it.
2. id: the second argument is the local identity of the construct. It’s an ID that has to be unique amongst construct within the same scope. The CDK uses this identity to calculate the CloudFormation Logical ID for each resource defined within this scope. Learn more [here](https://docs.aws.amazon.com/cdk/latest/guide/identifiers.html#identifiers_logical_ids)
3. props: the last (sometimes optional) argument is always a set of initialization properties. Those are specific to each construct. For example, the lambda.Function construct accepts properties like runtime, code and handler.

## This project specifics

We will define construct called HitCounter. This construct can be attached to any Lambda function that’s used as an API Gateway backend, and it will count how many requests were issued to each URL path. It will store this in a DynamoDB table.
