import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton";
import Headbar from './HeadBarUser';
import Inputbox from '../../assets/Inputbox';

export const LoginPage = () => {

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
            <div>
                <Headbar setSearchTerm={setSearchTerm} />
            </div>
            <div style={{ marginTop: '120px' }}></div>
            <div style={styles.padding}>
                <Title value='Login' fontWeight='Bold'></Title>
            </div>
            <div style={styles.padding}>
            </div>


                <Title value='Username/Email'></Title>
                <Inputbox onChange={e => setUsernameOrEmail(e.target.value)}/>
                    {usernameOrEmailError && <Title value='Username/Email cannot be empty.' color='red' fontSize='14px'></Title>} 
                <Title value='Password'></Title>
                <Inputbox onChange={e => setPassword(e.target.value)}/>
                    {passwordError && <Title value='Password cannot be empty.' color='red' fontSize='14px'></Title>} 
                <CustomButton buttonText="Login" onClick={handleOkClick}></CustomButton>
        </div>
    );
}

const styles = {
    padding: {
        paddingTop: '10px',
        paddingBottom: '10px',
        textAlign: 'left',
    },
    padding2: {
        paddingBottom: '10px',
        textAlign: 'center',
    },
};

export default LoginPage;