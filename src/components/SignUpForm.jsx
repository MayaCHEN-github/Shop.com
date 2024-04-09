import react, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'


export default function SignUpForm(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = {
            "username":username,
            "password":password,
            "email":email
        }

        fetch("http://localhost:3001/register",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(result => {console.log(result)
        navigate("/login")
        })
        .catch(err => console.log(err))
    }

    return(
        <>
            <h1>Create a new account</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <input type="text" name="username" placeholder='Enter username' onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>E-mail</Form.Label>
                    <input type="email" name="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <input type="password" name="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <button type = "submit" className="btn btn-primary">Sign up</button>
            </Form>
            <p>Log into existing account</p>
        </>
    )
}