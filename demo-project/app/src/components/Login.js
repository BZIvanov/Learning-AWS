import { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({ Username: email, Pool: UserPool });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => console.log('success', data),
      onFailure: (err) => console.log('fail', err),
      newPasswordRequired: (data) => console.log('new password', data),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
