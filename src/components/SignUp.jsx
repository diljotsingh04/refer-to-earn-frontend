import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setCurUserData }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const createUser = await axios.post("http://localhost:3000/signup", {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(createUser.message);
            navigate('/signin')

        } catch (error) {
            setMessage("Error Creating User");
        }

    }
    return (
        <>
            <form onSubmit={handleClick}>
                <h1>SignUp</h1>
                Enter your Email<input type="text" onChange={(e) => setEmail(e.target.value)} value={email} /><br />
                Enter your password<input type="text" onChange={(e) => setPassword(e.target.value)} value={password} /><br />
                Confirm Password<input type="text" /><br />
                <button type='submit'>Submit</button>
            </form>
            <div className="message">{message}</div>
        </>
    )
}

export default SignUp
