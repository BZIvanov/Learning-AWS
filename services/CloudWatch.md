# CloudWatch

CloudWatch service is good for checking things. For example debugging.

# Basic Usage

1. In the AWS managment console search for **CloudWatch** service or pick from the Services dropdown menu.

<img src="./pics/aws-console.png" alt="drawing" width="700"/>

2. Here is the initial screen of the service.

<p><img src="./pics/cloudwatch/cloudwatch.PNG" alt="drawing" width="700"/></p>

3. Here we will check an example with console.log coming from a lambda function. Click **Log groups** under **Logs**. Click the lambda function execution details. Note that for this example we have lambda function console.logging some text and we have executed it already to have some logs which we can check.

<p><img src="./pics/cloudwatch/logs.PNG" alt="drawing" width="700"/></p>

4. You will see stream of logs, if you have multiple select the latest. On the below screenshot you can see after the INFO, the text our lambda function is console.logging everytime the function is executed.

<p><img src="./pics/cloudwatch/debug-option.PNG" alt="drawing" width="700"/></p>
