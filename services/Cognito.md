# Cognito

Cognito service is a way to work with users and credentials

# Basic Usage

1. In the AWS managment console search for **Cognito** service or pick from the Services dropdown menu.
   <img src="./pics/aws-console.png" alt="drawing" width="700"/>

2. You have two main options:

- **Manage User Pools** - for working with users.
- **Manage Identity Pools**- for working for example with google, facebook.

# Manage User Pools

This pool will maanage users signed up in our application.

1. Select the option **Manage User Pools**, click the button **Create a user pool**. Now give it a name and select **Step through settings**.
   <img src="./pics/cognito/create-user-pool.PNG" alt="drawing" width="700"/>

2. Proceed with selection as on the screenshots.
   <img src="./pics/cognito/config-user-pool.PNG" alt="drawing" width="700"/>
   <img src="./pics/cognito/config-user-pool-2.png" alt="drawing" width="700"/>
   <img src="./pics/cognito/config-user-pool-3.PNG" alt="drawing" width="700"/>
   <img src="./pics/cognito/config-user-pool-4.PNG" alt="drawing" width="700"/>
   <img src="./pics/cognito/config-user-pool-5.PNG" alt="drawing" width="700"/>
   <img src="./pics/cognito/config-user-pool-6.PNG" alt="drawing" width="700"/>
   <img src="./pics/cognito/config-user-pool-7.PNG" alt="drawing" width="700"/>
   <img src="./pics/cognito/config-user-pool-8.PNG" alt="drawing" width="700"/>

- On the next step click **Add an app client**. Important here is to uncheck **Generate client secret**.
  <img src="./pics/cognito/config-user-pool-9.PNG" alt="drawing" width="700"/>
  <img src="./pics/cognito/config-user-pool-10.PNG" alt="drawing" width="700"/>
  <img src="./pics/cognito/config-user-pool-11.PNG" alt="drawing" width="700"/>

3. Click **Create Pool** after reviewing the selected settings.

4. Set domain name for your app:
   <img src="./pics/cognito/domain-name.PNG" alt="drawing" width="700"/>

5. Here is the workflow of what is actually happening
   <img src="./pics/cognito/auth-flow.PNG" alt="drawing" width="700"/>

# Cognito with React

The react project is in the demo-project folder.

Clicking **Users and groups** you can see the list of users creating on the client.

While testing with random emails on signup, then we get error for unconfirmed email, we can manually confirm the mail in the pool window. Click **Users and groups**, then specific user and click the button **Confirm user**.
