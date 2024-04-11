import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import CustomUserTable from "./CustomUserTable";
import Title from "../../assets/Title";
import CustomButton from "../../assets/CustomButton";
import Headbar from './HeadBarAdmin';
import Modalbox from '../../assets/Modalbox';
import Inputbox from '../../assets/Inputbox';
import e from 'cors';
import bcrypt from 'bcryptjs';


export const AdminUserPage = () => {

    const [isOpen, setIsOpen] = useState(false); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false); 
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [data, setData] = useState([]);

    const [editIndex, setEditIndex] = useState(null);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
      const userType = localStorage.getItem('user_type');
      if (userType !== "admin") {
        navigate("/")
      }
    }, [localStorage.userType])

    useEffect(() => {
        fetch('http://localhost:3001/all-users')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);
    

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

    const handleOkClick = async() => {

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

        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(password, 10);
    
        let user;
        if (isEditUserOpen) { // edit user
            user = { user_id: data[editIndex].user_id, username: username, password: passwordHash, email: email};
        } else if (isAddUserOpen) { // add new user
            let newUserId;
            if (data.length === 0) {
                newUserId = '001';
            } else {
                const maxUserId = Math.max(...data.map(item => Number(item.user_id)));
                newUserId = String(maxUserId + 1).padStart(3, '0');
            }
            user = { user_id: newUserId, username: username, password: passwordHash, email: email};
        }
    
        if (isEditUserOpen) { // edit user
            fetch(`http://localhost:3001/edit-user/${data[editIndex]._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(response => response.json())
            .then(updatedUser => {
                const newData = [...data];
                newData[editIndex] = updatedUser;
                setData(newData);
                setIsEditUserOpen(false);
                setEditIndex(null); 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else if (isAddUserOpen) { // add new user
            fetch('http://localhost:3001/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(response => response.json())
            .then(newUser => {
                setData(prevData => [...prevData, newUser]);
                setIsAddUserOpen(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
    
    
    
    

    const handleDelete = (index) => {
        fetch(`http://localhost:3001/delete-user/${data[index]._id}`, {
            method: 'DELETE',
        })
        .then(() => {
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    //console.log(data.map(user => user.username));

    return (
        <div>
            <div>
                <Headbar setSearchTerm={setSearchTerm} />
            </div>
            <div style={{ marginTop: '160px' }}></div>
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