import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const DashBoard = () => {
    const [amount, setAmount] = useState();
    const [refLink, setRefLink] = useState("");
    const [buttonText, setButtonText] = useState("Copy Text");
    const [email, setEmail] = useState("");
    const [isValidUser, setIsValidUser] = useState(localStorage.getItem("token") ? true : false);
    const [refresh, setRefresh] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (refresh != 0) {
            const getLocalStorage = localStorage.getItem("token");
            const data = JSON.parse(getLocalStorage);

            if (data) {
                const getDetails = async () => {
                    const response = await axios.post("http://localhost:3000/dashboard", {
                        userId: data.userId
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.data.uId) {
                        setIsValidUser(false);
                    }
                    else {
                        setAmount(response.data.amount);
                    }
                }
                getDetails();
            }
        }
    }
    , [refresh]);

    useEffect(() => {
        const getLocalStorage = localStorage.getItem("token");
        const data = JSON.parse(getLocalStorage);

        if (data) {
            const getDetails = async () => {
                const response = await axios.post("http://localhost:3000/dashboard", {
                    userId: data.userId
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.data.uId) {
                    setIsValidUser(false);
                }
                else {
                    setEmail(response.data.email);
                    setAmount(response.data.amount);
                    setRefLink(window.location.href + "refer/" + response.data.uId)
                }
            }
            getDetails();
        }
    }
        , []);

    const copyText = () => {
        navigator.clipboard.writeText(refLink);
        setButtonText("Copied !");
        setTimeout(() => {
            setButtonText("Copy Text");
        }, 1000);
    }
    const logout = () => {
        localStorage.removeItem("token");
        setIsValidUser(false);
    }

    return (
        <>
            {isValidUser ?
                <center>
                    <h1>Hello {email}</h1>
                    <h3>Your Amount is {amount}</h3>
                    <button onClick={()=>setRefresh(Math.random())}>Refresh</button>
                    <h4>Reference Id: {refLink}</h4>
                    <button onClick={copyText}>{buttonText}</button>
                    <button onClick={logout}>Logout</button>
                </center>
                :
                <Navigate to="/signup" />
            }
        </>
    )
}

export default DashBoard
