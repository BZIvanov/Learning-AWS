import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_SpZsgTUNe', // You can find in "General settings" > "Pool Id" in your user pool overview
  ClientId: 'c3icdhkp41o68u9q69i21pa8o', // You can find this in "App clients"
};

export default new CognitoUserPool(poolData);
