import React, { useState, useEffect } from 'react';

function LoginPage() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = (event) => {
      event.preventDefault();
      // Perform login logic here
      console.log('Login form submitted');
      console.log('Username/Email:', usernameOrEmail);
      console.log('Password:', password);
    };
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label>
            Username/Email:
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(event) => setUsernameOrEmail(event.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
  export default LoginPage;