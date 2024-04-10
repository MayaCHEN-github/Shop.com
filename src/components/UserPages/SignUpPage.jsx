import { React, useState, useEffect } from 'react';

import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton";
import Headbar from './HeadBarUser';
import Inputbox from '../../assets/Inputbox';
import {useNavigate} from 'react-router-dom';

export const SignUpPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmpasswordError, setConfirmPasswordError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [data, setData] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();


    const checkEmptyInput = (input, setInputError) => {
        if (!input.trim()) {
            setInputError(true);
            return true;
        } else {
            setInputError(false);
            return false;
        }
    };

    const handleOkClick = (e) => {
        e.preventDefault();

        const isusernameEmpty = checkEmptyInput(username, setUsernameError);
        const ispasswordEmpty = checkEmptyInput(password, setPasswordError);
        const isconfirmpasswordEmpty = checkEmptyInput(confirmpassword, setConfirmPasswordError);
        const isemailEmpty = checkEmptyInput(email, setEmailError);
    
        if (isusernameEmpty || ispasswordEmpty || isconfirmpasswordEmpty || isemailEmpty) {
            return;
        }
    
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmailValid) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }

        if (password !== confirmpassword) {
            setConfirmPasswordError(true);
            return;
        } else {
            setConfirmPasswordError(false);
        }
        
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
            <div>
                <Headbar setSearchTerm={setSearchTerm} />
            </div>
            <div style={{ marginTop: '120px' }}></div>
            <div style={styles.padding}>
                <Title value='Sign Up' fontWeight='Bold'></Title>
            </div>
            <div style={styles.padding}>
            </div>


                <Title value='Username'></Title>
                <Inputbox onChange={e => setUsername(e.target.value)}/>
                    {usernameError && <Title value='Username cannot be empty.' color='red' fontSize='14px'></Title>} 
                <Title value='Email'></Title>  
                <Inputbox onChange={e => setEmail(e.target.value)}/>
                    {emailError && <Title value='Email cannot be empty and email must be in format example@domain.com.' color='red' fontSize='14px'></Title>} 
                <Title value='Password'></Title>
                <Inputbox onChange={e => setPassword(e.target.value)}/>
                    {passwordError && <Title value='Password cannot be empty.' color='red' fontSize='14px'></Title>} 
                <Title value='Confirm Password'></Title>
                <Inputbox onChange={e => setConfirmPassword(e.target.value)}/>
                    {confirmpasswordError && <Title value='Confirm password cannot be empty and must be the same as password.' color='red' fontSize='14px'></Title>} 
                <CustomButton buttonText="Create Account" onClick={handleOkClick}></CustomButton>
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

export default SignUpPage;