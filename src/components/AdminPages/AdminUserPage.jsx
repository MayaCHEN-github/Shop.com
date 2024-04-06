import { React, useState } from 'react';
import CustomUserTable from "./CustomUserTable";
import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton";
import Headbar from './HeadBarAdmin';
import Modalbox from '../../assets/Modalbox';
import Inputbox from '../../assets/Inputbox';

export const AdminUserPage = () => {

    const [isOpen, setIsOpen] = useState(false); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false); 
    const [data, setData] = useState([
        {
            UserID: '1',
            UserName: 'Alice',
            UserPassword: 'password1'
        },
        {
            UserID: '2',
            UserName: 'Bob',
            UserPassword: 'password2'
        },
    ]); 
    const [editIndex, setEditIndex] = useState(null);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');



    const handleOpenAddUserModal = () => {
        setUsername('');
        setPassword('');
        setUsernameError(false);
        setPasswordError(false);
        setIsAddUserOpen(true);
    };
    
    const handleCloseAddUserModal = () => {
        setIsAddUserOpen(false);
    };

    const handleOpenEditUserModal = (index) => {
        setUsername(data[index].UserName);
        setPassword(data[index].UserPassword);
        setUsernameError(false);
        setPasswordError(false);
        setEditIndex(index);
        setIsEditUserOpen(true);
    };
    
    const handleCloseEditUserModal = () => {
        setIsEditUserOpen(false);
    };

    const handleOkClick = () => {
        if (username.trim() === '' && password.trim() === ''){
            setUsernameError(true);
            setPasswordError(true);
            return;
        }
        if (username.trim() === ''){
            setUsernameError(true);
            setPasswordError(false);
            return;
        }
        if (password.trim() === ''){
            setPasswordError(true);
            setUsernameError(false);
            return;
        }
    
        const newData = [...data];
        if (isEditUserOpen) { // edit user
            newData[editIndex] = { UserID: newData[editIndex].UserID, UserName: username, UserPassword: password };
            setIsEditUserOpen(false);
        } else if (isAddUserOpen) { // add new user
            const newUserID = String(newData.length + 1);
            newData.push({ UserID: newUserID, UserName: username, UserPassword: password });
            setIsAddUserOpen(false);
        }
        setData(newData);
        setEditIndex(null); // reset editIndex after updating data
    };
    

    const handleDelete = (index) => { // delete user
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

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
                <CustomUserTable data={data.filter(user => user.UserName.includes(searchTerm))} onDelete={handleDelete} onEdit={handleOpenEditUserModal}/>
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
                <CustomButton buttonText="OK" onClick={handleOkClick}></CustomButton>
            </Modalbox>

            <Modalbox onClose={handleCloseEditUserModal} isOpen={isEditUserOpen}> 
                <div style={styles.padding2}>
                    <Title value='Edit user' fontWeight='bold' fontSize='30px'></Title>
                </div>
                <Title value='Username'></Title>
                <Inputbox onChange={e => setUsername(e.target.value)}/>
                    {usernameError && <Title value='Username cannot be empty.' color='red' fontSize='14px'></Title>} 
                <Title value='Password'></Title>
                <Inputbox onChange={e => setPassword(e.target.value)}/>
                    {passwordError && <Title value='Password cannot be empty.' color='red' fontSize='14px'></Title>} 
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
