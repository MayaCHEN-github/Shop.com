import { React, useState, useEffect } from 'react';

import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton";
import Headbar from './HeadBarUser';
import Inputbox from '../../assets/Inputbox';

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

    useEffect(() => {
        fetch('http://localhost:3001/all-users')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);
    


    const checkEmptyInput = (input, setInputError) => {
        if (!input.trim()) {
            setInputError(true);
            return true;
        } else {
            setInputError(false);
            return false;
        }
    };

    const handleOkClick = () => {

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
    
        let user;
        let newUserId;
        if (data.length === 0) {
            newUserId = '001';
        } else {
            const maxUserId = Math.max(...data.map(item => Number(item.user_id)));
            newUserId = String(maxUserId + 1).padStart(3, '0');
        }
        user = { user_id: newUserId, username: username, password: password, email: email};
    }
    
    

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