# Controller

Controlling of what happens, when our API is accessed is defined with working on the request and the response. In this example the cycle of the image below will start when we receive POST request for something/compare-yourself url:

<img src="./pics/api-gateway/api-req-res-details.PNG" alt="drawing" width="700"/>

1. **Method Request** - here we can validate the request, like authorization, api keys required.

2. **Integration Request** - if everything was validated and correct in the previous we get to this step. Here we can transform the incoming data in the shape we want it.

3. **Integration Response** - in the integration request we shape the data we receive and here we shape the data we are going to send.

4. **Method Response** - here we can set response status code and the type of headers. Only the type of the headers, the value still will be in integration response.

Below is an example of how to transform the response in a easy to use way for a lambda function.

```javascript
// this is how the code in lambda function looks like
exports.handler = async (event) => {
  const age = event.myAge;
  return age;
};
```

1. Click the **Integration Request** and expand the **Mapping Templates** section. Check the (recommended) second option. Click the **Add mapping template** link and provide type _application/json_, provide some template and click the **Save** button.

<img src="./pics/api-gateway/mapping-template.PNG" alt="drawing" width="700"/>

$input refers to the request data and the dollar sign refers to the request body. Read [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html) for more info on mapping templates syntax.

2. Go back to the Method Execution (req-res cycle diagram) and click the **Test** icon. For the **Request Body** provide the following object:

```javascript
// testing body data
{
  "personData": {
    "age": 28
  }
}
```

3. In the **Response Body** you should see 28. This way we have clear separation, where APIGateway is extracting the data and providing to the Lambda function only the data it needs.

4. To extend this example even further we can also transform the result from the lambda function. Click the **Integration Response**, expand the options by clicking the triangle icon, click **Mapping Templates**. We will again use application/json template

<img src="./pics/api-gateway/transform-response.PNG" alt="drawing" width="700"/>

$input is the info sent by the lambda and the $ is the data.

5. Go back and test the API. You should see the following result.

<img src="./pics/api-gateway/test-result.PNG" alt="drawing" width="700"/>

# Models

With models we can create schema to work only with the shape of the data we need and to validate the data.

1. To create a model for your api click **Models** on the left panel. Click the button **Create**. Giva a name for you model and content type, provide the schema and click **Create model**.

<img src="./pics/api-gateway/create-model.PNG" alt="drawing" width="700"/>

2. After creation you will have it in the list with models. Now go back to **Resources**, choose for which method you want to use it, from the Method Execution diagram select **Method Request**, expand **Request Body**, click **Add Model**, give it a type, and from the dropdow select the model we have just created, also click the check icon.

3. Now we need to select what we want to validate with the selected model. On the same window, click the edit pen icon for the **Request Validator**, select **Validate Body**, agree with the check icon.

<img src="./pics/api-gateway/using-model.PNG" alt="drawing" width="700"/>

4. To test if working, go back to the Method Execution diagram, click the **TEST** icon, now you have to provide **Request Body** with valid data as specified in the schema or you will get message for invalid body request in the **Response Body**.

5. We could do all this kind of validation in lamda function as well, this is one of the options we have, but if we do it this way, the request will be rejected before reaching the lambda function from the Integration Request.

6. Now go to the **Integration Request**, expand the **Mapping Templates**, from the **Generate template** now you have the option to selected the Model we have created and you will automatically get the mapping for it, which you can further change.

<img src="./pics/api-gateway/map-model-ir.PNG" alt="drawing" width="700"/>

7. Now you can go and test again with valida body provided, you should get the age result with following lambda code:

```javascript
exports.handler = async (event) => {
  const age = event.age;
  return age;
};
```

8. From steps 6 and 7 you can do similar thing for the **Integration Response** as well.

# Variable Resource

To extract parts of the url as variable we need to place the path in curly braces.

1. Click **Resources**, then **Actions** button, then **Create Resource**. Give it a name and path in curly braces. Enable cors and click **Create Resource**.

<img src="./pics/api-gateway/path-variable.PNG" alt="drawing" width="700"/>

2. Now for this resource also create GET method. For the method assign lambda function. The code below is in the lambda function. Use the lambda function for this GET method and click **Save** button.

```javascript
exports.handler = async (event) => {
  const type = event.type;
  if (type === 'all') {
    return 'All the data';
  } else if (type === 'single') {
    return 'Just my data';
  } else {
    return 'Hello from lambda';
  }
};
```

3. Now in the Method Execution diagram click **Integration Request**. Expand **Mapping Templates** and as we did previously, select the second (recommended) option. Click **Add mapping template** give it type _aaplication/json_ and provide template. Click the **Save** button.
   <img src="./pics/api-gateway/map-param.PNG" alt="drawing" width="700"/>

4. Go to test now, if working you should see:
   <img src="./pics/api-gateway/test-param.PNG" alt="drawing" width="700"/>

# Authorizers

1. To create authorizer select the method for the resource you want to create authorizer and click **Authorizers** from the menu on the left. Click **Create New Authorizer**.

2. Give it a name, select lambda function, provide Token source and click **Create**.
   <img src="./pics/api-gateway/create-authorizer.PNG" alt="drawing" width="700"/>

This is the code from the lambda function:

```javascript
exports.handler = (event, context, callback) => {
  const token = event.authorizationToken;

  if (token === 'allow') {
    const policy = genPolicy('allow', event.methodArn);
    const principalId = 'somethingrandom';
    const context = {
      simpleAuth: true,
    };
    const response = {
      principalId: principalId,
      policyDocument: policy,
      context: context,
    };
    callback(null, response);
  } else if (token === 'deny') {
    const policy = genPolicy('deny', event.methodArn);
    const principalId = 'somethingrandom';
    const context = {
      simpleAuth: true,
    };
    const response = {
      principalId: principalId,
      policyDocument: policy,
      context: context,
    };
    callback(null, response);
  } else {
    callback('Unauthorized');
  }
};

function genPolicy(effect, resource) {
  // we are creating object similar to a policy object, we can see how it looks like if we open a policy in JSON format
  const policy = {};
  policy.Version = '2012-10-17';
  policy.Statement = [];
  const stmt = {};
  stmt.Action = 'execute-api:Invoke';
  stmt.Effect = effect;
  stmt.Resource = resource;
  policy.Statement.push(stmt);
  return policy;
}
```

3. Go back to **Resources** and click the method for which you will assign authorization, then click **Method Request** and for **Settings** **Authorization** use our new custom authorizator.
   <img src="./pics/api-gateway/use-authorizator.PNG" alt="drawing" width="700"/>

4. From **Actions** button **Deploy API** to save changes for our API. Now we can use this resource with header "Authorization": "allow", otherwise it won't work.
