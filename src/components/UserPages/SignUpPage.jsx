import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  
  const handleSignUp = (event) => {
    event.preventDefault();


      const data = {
          "username":username,
          "password":password,
          "email":email
      }

      fetch("http://localhost:3001/signup",{
          method: 'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }).then(result => {console.log(result)
      navigate("/login")
      })
      .catch(err => console.log(err))
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignUpPage;