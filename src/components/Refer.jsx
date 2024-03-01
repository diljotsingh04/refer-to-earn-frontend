import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const Refer = () => {

    const { prevUserId } = useParams();
    const [curUserId, setCurUserId] = useState(null);

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
            const newUserId = createUser.data.newUserId;
            setCurUserId(createUser.data.newUserId);
            setMessage(createUser.data.message);

            if (newUserId) {
                console.log("refered login raned")
                const createUser = await axios.put("http://localhost:3000/refer", {
                    id: prevUserId,
                    referedId: newUserId
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                navigate('/signin');
            }
            else{
                console.log("not ran")
            }


        } catch (error) {
            console.log(email, password)
            setMessage("Error Creating User");
        }

    }

    return (
        <>
            {/* <h1>{prevUserId}</h1>
            <h1>{curUserId}</h1> */}
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

export default Refer
