import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // BI the first parameter (scope) is always this
    const bucket = new s3.Bucket(this, 'CdkTestBucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html', // BI the file name in out bucket
    });

    new s3Deployment.BucketDeployment(this, 'CdkDeploymentBucket', {
      sources: [s3Deployment.Source.asset('../react-app/build')], // react app build folder
      destinationBucket: bucket,
    });

    new cloudfront.CloudFrontWebDistribution(this, 'CfDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });
  }
}
