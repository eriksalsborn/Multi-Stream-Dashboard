import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserSession } from "./AuthService";
import axios from "axios";

// allows us to access the api
const loginUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/login";

// this component acts as a way for the user to login via Forms
const Login = () => {

    // declaring new state variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    // when logged in we want to send the user to another component
    // we are using useNavigate for this
    const navigate = useNavigate(); 

    // this function is called when submitting the form
    const submitHandler = (event) => {
        event.preventDefault();

        // making sure no fields are empty
        if (username.trim() === "" || password.trim() === "") {
            setMessage("All fields are required");
            return;
        }

        // required for call to server
        const requestConfig = {
            headers: {
                "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
            },
        }

        // what we want to send (post) to the server lambda function
        const requestBody = {
            username: username,
            password: password,
        }
        
        // using axios to send asynchronous HTTP requests to REST endpoints
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

    <div class="split">

    <div class="centerimage">

      <img src="logo192.png" alt="logo"></img>

    </div>

      <div class="row">

          <div class="centertop">

            <form onSubmit={submitHandler}>
                  <h5>Login</h5>

                  <div>
                    <div>
                      <input type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} /> <br />
                    </div>

                    <div>
                      <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} /> <br />
                    </div>

                  </div>

                  <div>
                    <input type="submit" value="Login" id="submit-button" />
                  </div>
                </form>
                {message && <p className="message">{message} </p>}
                
            </div>

          <div class="center">

          <p> Har du inget konto? <a data-testid="sign-up-link" href="/register" tabindex="0"><span>Registrera dig</span></a></p>

          </div>
  
</div>

      </div>
     
    
    
  )
}

export default Login
