# IAM

IAM service is manager for roles and identity.

# Basic Usage

1. In the AWS managment console search for **IAM** service or pick from the Services dropdown menu.
   <img src="./pics/aws-console.png" alt="drawing" width="700" border="2"/>

# Creating a policy and attaching it on a role

If we are working with DynamoDB it is not good practice to use the full access policy, we should use custom and more specific serving only the purpose it needs, not unlimited rights.

1. To create a policy go to IAM service and click **Policies** and click **Create policy**
   <img src="./pics/iam/create-policy.png" alt="drawing" width="700" border="2"/>

2. Select the **Service**, then select which actions you want to use for this role (PutItem in this example), select all you need and click the **close** link. Also provide the ARN(Amazon Resource Name) code for the table resource. You can see the DynamoDB table ARN in the Overview tab. Click **AddARN** link and paste the arn code.
   <img src="./pics/iam/policy-config.png" alt="drawing" width="700" border="2"/>

3. After clicking **Review policy**, now give it a name and click **Create policy**.

4. Go to **Roles** from the menu on the left, select some role and from the **Attach policies** button you can attach our newly created policy. Search it and select it by checking the box on the left and click **Attach policy** buton.
   <img src="./pics/iam/attach-policy.png" alt="drawing" width="700" border="2"/>

5. Basically the cycle is to create policy for some service and some functionalities of that service and then to use that policy for some role which will be allowed to do only whatever is specified in the policy. Then we can use that role on some lambda function for example to limit the rights only to what we expect that function to do.
