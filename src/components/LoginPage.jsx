import react, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';

export default function SignUpForm(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = {
            "username":username,
            "password":password,
        }

        try{
            const response = fetch("http://localhost:3001/login",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            
            const result = response.json();
            if(result.message === 'success'){
                navigate("/home")
            }else{
                alert("Error: " + result.message);
            }
        }catch(err){console.log(err)}
    }

    return(
        <>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <input type="text" name="username" placeholder='Enter username' onChange={(e)=>setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <input type="password" name="password" placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <button type = "submit" className="btn btn-primary">Sign up</button>
            </Form>
            <p>Sign up instead</p>
        </>
    )
}