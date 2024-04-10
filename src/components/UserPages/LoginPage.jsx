import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function LoginPage() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
      event.preventDefault();
    
          const data = {
              "usernameOrEmail":usernameOrEmail,
              "password":password,
              
          }
    
          fetch("http://localhost:3001/login",{
              method: 'POST',
              headers:{
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(response => response.json())
          .then(result => {
             if(result.message === 'success'){
              localStorage.setItem('token', result.token);
              navigate('/');
             } else{
              alert('Error: ' + result.message);
             }
            })
          .catch(err => console.log(err))
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