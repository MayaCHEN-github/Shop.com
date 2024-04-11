import { React, useState, useEffect } from 'react';

import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton";
import Headbar from './HeadBarUser';
import Inputbox from '../../assets/Inputbox';
import {useNavigate} from 'react-router-dom';

export const LoginPage = () => {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameOrEmailError, setUsernameOrEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [data, setData] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const navigate  = useNavigate();
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

    const handleOkClick = (e) => {
        e.preventDefault();
        const isusernameOrEmailEmpty = checkEmptyInput(usernameOrEmail, setUsernameOrEmailError);
        const ispasswordEmpty = checkEmptyInput(password, setPasswordError);

        if (isusernameOrEmailEmpty || ispasswordEmpty) {
            return;
        }

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
        }).then(response => {
            console.log('Response:', response);
            return response.json();
        })
        .then(result => {
            console.log('Result:', result);
            if(result.message === 'success'){
                localStorage.setItem('token', result.token);
                localStorage.setItem('user_type', result.user_type)
                if (result.user_type === 'admin') {
                    navigate('/admin-user');
                } else {
                    navigate('/');
                    console.log('User:', result.user);
                }
            } else{
                alert('Error: ' + result.message);
            }
        })
        .catch(err => console.log('Error:', err));

    }
    
    

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
                <CustomButton buttonText="Sign up instead" onClick={()=>navigate('/sign-up')}></CustomButton>
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