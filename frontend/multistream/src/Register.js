import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// allows us to access the api for register lambda function
const registerUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/register"

// This component should act as a way for the user to use Forms to register an account
const Register = () => {
    document.body.style.backgroundColor = "#D2D6E6"

    // declaring new state variables for user input and message
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null)

    //variable with the useNavigate function
    let navigate = useNavigate()

    // this function is called when submitting the form
    const submitHandler = (event) => {
        // cancels the event if it is cancelable
        event.preventDefault()

        // making sure no fields are empty
        if (username.trim() === "" || email.trim() === "" || name.trim() === "" || password.trim() === "") {
            setMessage("All fields are required")
            return
        }

        // required for call to server
        const requestConfig = {
            headers: {
                "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
            },
        }

        // Information backend needs for register function
        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password,
        }

        //using axios to send asynchronous HTTP requests to REST endpoints
        axios
            .post(registerUrl, requestBody, requestConfig)
            .then((response) => {
                setMessage("Registeration Successful")
                navigate("/login")
            })
            .catch((error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    setMessage(error.response.data.message)
                } else {
                    setMessage("Sorry... The backend server is down. Please try again later.")
                }
            })
    }

    return (
        <div class="split">
            <div class="centerimage">
                <img src="pngwing.png" width="400" height="400" alt="logo"></img>
            </div>

            <div class="row">
                <div class="centertop">
                    <form onSubmit={submitHandler}>
                        <h5>Register</h5>

                        <div>
                            <div>
                                <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />{" "}
                                <br />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />{" "}
                                <br />
                            </div>

                            <div>
                                <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />{" "}
                                <br />
                            </div>

                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />{" "}
                                <br />
                            </div>
                        </div>

                        <div>
                            <input type="submit" value="Register" id="submit-button" href="/login" />
                        </div>
                    </form>
                    {message && <p className="message">{message} </p>}
                </div>

                <div class="center">
                    <p>
                        {" "}
                        Har du redan ett konto?{" "}
                        <a data-testid="sign-up-link" href="/login" tabindex="0">
                            <span>Logga in</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
