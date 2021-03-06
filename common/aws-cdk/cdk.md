# CDK

The AWS Cloud Development Kit (AWS CDK) is an open source software development framework to define your cloud application resources using familiar programming languages.

Check [here](https://github.com/aws/aws-cdk) for the development guide, API and eveything else.

CDK is creating our CloudFormation stack.

## Installation

For details check the github page above or run the following command:

```bash
npm i -g aws-cdk
```

to check if installed correctly

```bash
cdk version
```

And to initialize a new project:

```bash
cdk init sample-app --language=typescript
```

Note that sample-app is not the name of the project, it is the type of the template.

## General Info

**Resource** - any piece of infrustrcture, that is created via the CDK is a resource. Every _resource_ has identifier with which we can reference the resource.

**Construct** - logical grouping of one or more resources.

**Stack** - unit of deployment within the CDK.

**App** - contains one ore more stacks.
