import { React, useState, useEffect } from 'react';
import CustomUserTable from "./CustomUserTable";
import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton";
import Headbar from './HeadBarAdmin';
import Modalbox from '../../assets/Modalbox';
import Inputbox from '../../assets/Inputbox';
import e from 'cors';

export const AdminUserPage = () => {

    const [isOpen, setIsOpen] = useState(false); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false); 
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    
    const [data, setData] = useState([
        {
            "_id": {
              "$oid": "660e6facc9c1389123db0e34"
            },
            "user_id": "001",
            "username": "hellouser",
            "password": "qwerty",
            "shopping_cart": [
              {
                "_id": {
                  "$oid": "6611587b68b82b50fefb76a3"
                },
                "item": {
                  "$oid": "660be193560e2d2fb3aec50e"
                },
                "purchased": 7
              }
            ],
            "__v": 7,
            "email": "123@gmail.com"
          },
    ]); 
    const [editIndex, setEditIndex] = useState(null);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');



    const handleOpenAddUserModal = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setUsernameError(false);
        setPasswordError(false);
        setEmailError(false);
        setIsAddUserOpen(true);
    };
    
    const handleCloseAddUserModal = () => {
        setIsAddUserOpen(false);
    };

    const handleOpenEditUserModal = (index) => {
        setUsername(data[index].username);
        setPassword(data[index].password);
        setEmail(data[index].email);
        setUsernameError(false);
        setPasswordError(false);
        setEmailError(false);
        setEditIndex(index);
        setIsEditUserOpen(true);
    };
    
    const handleCloseEditUserModal = () => {
        setIsEditUserOpen(false);
    };


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
        const isemailEmpty = checkEmptyInput(email, setEmailError);

        if (isusernameEmpty || ispasswordEmpty || isemailEmpty) {
            return;
        }
    
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmailValid) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }
    
        let newUserId;
        if (data.length === 0) {
            newUserId = '001';
        } else {
            const maxUserId = Math.max(...data.map(item => Number(item.user_id)));
            newUserId = String(maxUserId + 1).padStart(3, '0');
        }

    
        const newData = [...data];
        if (isEditUserOpen) { // edit user
            newData[editIndex] = { user_id: newData[editIndex].user_id, username: username, password: password, email: email};
            setIsEditUserOpen(false);
        } else if (isAddUserOpen) { // add new user
            newData.push({ user_id: newUserId, username: username, password: password, email: email});
            setIsAddUserOpen(false);
        }
        setData(newData);
        setEditIndex(null); 
    };
    
    

    const handleDelete = (index) => { // delete user
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    //console.log(data.map(user => user.username));

    return (
        <div>
            <div>
                <Headbar setSearchTerm={setSearchTerm} />
            </div>
            <div style={{ marginTop: '130px' }}></div>
            <div style={styles.padding}>
                <Title value='User management' fontWeight='Bold'></Title>
            </div>
            <div style={styles.padding}>
                <CustomButton styleType="style4" buttonText = 'add new user +' onClick={handleOpenAddUserModal}/>
            </div>
            <div style={styles.padding}>
                <CustomUserTable data={data.filter(user => user.username.includes(searchTerm))} onDelete={handleDelete} onEdit={handleOpenEditUserModal}/>
            </div>

            <Modalbox onClose={handleCloseAddUserModal} isOpen={isAddUserOpen}> 
                <div style={styles.padding2}>
                    <Title value='Add a new user' fontWeight='bold' fontSize='30px'></Title>
                </div>
                <Title value='Username'></Title>
                <Inputbox onChange={e => setUsername(e.target.value)}/>
                    {usernameError && <Title value='Username cannot be empty.' color='red' fontSize='14px'></Title>} 
                <Title value='Password'></Title>
                <Inputbox onChange={e => setPassword(e.target.value)}/>
                    {passwordError && <Title value='Password cannot be empty.' color='red' fontSize='14px'></Title>} 
                <Title value='Email'></Title>  
                <Inputbox onChange={e => setEmail(e.target.value)}/>
                    {emailError && <Title value='Email cannot be empty and email must be in format example@domain.com.' color='red' fontSize='14px'></Title>} 
                <CustomButton buttonText="OK" onClick={handleOkClick}></CustomButton>
            </Modalbox>

            <Modalbox onClose={handleCloseEditUserModal} isOpen={isEditUserOpen}> 
                <div style={styles.padding2}>
                    <Title value='Edit user' fontWeight='bold' fontSize='30px'></Title>
                </div>
                <Title value='Username'></Title>
                <Inputbox value={username} onChange={e => setUsername(e.target.value)}/>
                        {usernameError && <Title value='Username cannot be empty.' color='red' fontSize='14px'></Title>} 

                <Title value='Password'></Title>
                <Inputbox value={password} onChange={e => setPassword(e.target.value)}/>
                        {passwordError && <Title value='Password cannot be empty.' color='red' fontSize='14px'></Title>} 
                <Title value='Email'></Title>  
                <Inputbox value={email} onChange={e => setEmail(e.target.value)}/>
                    {emailError && <Title value='Email must be in format example@domain.com.' color='red' fontSize='14px'></Title>} 
                <CustomButton buttonText="OK" onClick={handleOkClick}></CustomButton>
                
            </Modalbox>
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

export default AdminUserPage;