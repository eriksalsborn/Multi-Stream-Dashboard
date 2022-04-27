import React, { useState } from "react";
import axios from "axios";

// allows us to access the api
const registerUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/register"


// This component should act as a way for the user to use Forms to register an account
const Register = () => {

  // declaring new state variables 
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  // this function is called when submitting the form
  const submitHandler = (event) => {
    
    // cancels the event if it is cancelable 
    event.preventDefault();

    // making sure no fields are empty
    if (username.trim() === "" || email.trim() === "" || name.trim() === "" || password.trim() === "") {
      setMessage("All fields are required");
      return;
    }

    // required for call to server
    const requestConfig = {
      headers: {
        "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
      },
    }

    // what we want to send (post) to the server 
    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password,
    }

    // using axios to send asynchronous HTTP requests to REST endpoints
    axios
      .post(registerUrl, requestBody, requestConfig)
      .then((response) => {
        setMessage("Registeration Successful");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Sorry... The backend server is down. Please try again later.");
        }
      });
  };

  return (
    <div class="center">

      <form onSubmit={submitHandler}>

        <h5>Register</h5>

        <div class="form">

          <div>
            name: <input type="text" value={name} onChange={(event) => setName(event.target.value)} /> <br />
          </div>

          <div>
            email: <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} /> <br />
          </div>

          <div>
            username: <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} /> <br />
          </div>
          
          <div>
            password: <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /> <br />
          </div>
          
        </div>

        <div>
            <input type="submit" value="Register" />
        </div>
        
      </form>
      {message && <p className="message">{message} </p>}
    </div>
  );
};

export default Register;
