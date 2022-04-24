import React, { useState } from "react";
import axios from "axios";

const registerUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/register";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === "" || email.trim() === "" || name.trim() === "" || password.trim() === "") {
      setMessage("All fields are required");
      return;
    }

    setMessage(null);

    const requestConfig = {
      headers: {
        "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
      },
    };
    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password,
    };
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
