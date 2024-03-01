import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = ({ setCurUserData, setIsSignIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const getUser = await axios.post("http://localhost:3000/signin", {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(getUser.data.message){
                console.log(getUser.data.message);
            }
            const newUserData = {
                email,
                userId: getUser.data.userId,
                balance: getUser.data.balance
            }
            localStorage.setItem("token", JSON.stringify(newUserData));

            // setCurUserData(newUserData)
            // setIsSignIn(true);
            navigate('/');

        } catch (error) {
            console.log("Falied to Signin")
        }
    }
    return (
        <>
            <form onSubmit={handleClick}>
                <h1>SignIn</h1>
                Enter your Email<input type="text" onChange={(e) => setEmail(e.target.value)} value={email} /><br />
                Enter your password<input type="text" onChange={(e) => setPassword(e.target.value)} value={password} /><br />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default SignUp
