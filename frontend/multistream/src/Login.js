import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService, { setUserSession } from "./AuthService";
import axios from "axios";

const loginUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/login";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate(); 

    const submitHandler = (event) => {
        event.preventDefault();

        if (username.trim() === "" || password.trim() === "") {
            setMessage("All fields are required");
            return;
        }

        setMessage(null);
        

        const requestConfig = {
            headers: {
                "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
            },
        }

        const requestBody = {
            username: username,
            password: password,
        }
        
        
        axios
            .post(loginUrl, requestBody, requestConfig)
            .then((response) => {
                
                setUserSession(response.data.user, response.data.token);
                setMessage("Login Successful");
                navigate('/layouts');

            }).catch((error) => {
            if (error.response.status === 401 || error.response.status === 403) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Sorry... The backend server is down. Please try again later.");
            }
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Login</h5>
                Username: <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} /> <br />
                Password: <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /> <br />
                <input type="submit" value="Login" />
            </form>
            {message && <p className="message">{message} </p>}
    </div>
    )
}

export default Login;