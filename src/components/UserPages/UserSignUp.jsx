import React, { useState, useEffect } from 'react';

function UserSignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSignUp = (event) => {
      event.preventDefault();
      // Perform sign-up logic here
      console.log('Sign-up form submitted');
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
    };
  
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
  
export default UserSignUp;