import React, { useState } from 'react'
import axios from 'axios';

function Login() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState("");

    const register = () => {
        axios({
            method: "POST",
            data: {
                username: registerUsername,
                email: registerEmail,
                password: registerPassword
            },
            withCredentials: true,
            url: "http://localhost:4000/register"
        })
        .then(res => console.log(res));
    };
    const login = () => {
        console.log('sending login request');
        axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:4000/login"
        })
        
        .then( res => {
            console.log(res)
                const currentUser = {
                    _id: res.data.data._id,
                    username: res.data.data.username
                }
                console.log('currentUser is', currentUser);
                // set local storage
                localStorage.setItem('isLogIn', true);
              
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                setIsLogin(true);
        }
        ).catch( error => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        });
    };
    const getUser = () => {
        console.log('getting user based on cookie');
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/user"
        })
        .then(res => console.log(res));
    };
    return (
        <div className="container">
            <div>
                <h1>Register</h1>
                <input placeholder="email" onChange={e => setRegisterEmail(e.target.value)} />
                <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)} />
                <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)} />
                <button onClick={register}>Submit</button>
            </div>

            <div>
                <h1>Login</h1>
                <input placeholder="username" onChange={e => setLoginUsername(e.target.value)} />
                <input placeholder="password" onChange={e => setLoginPassword(e.target.value)} />
                <button onClick={login}>Submit</button>
            </div>
            <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
            </div>

        </div>
    )
}

export default Login
