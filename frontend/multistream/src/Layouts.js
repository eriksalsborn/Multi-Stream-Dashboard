import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, resetUserSession } from "./AuthService";

import axios from "axios";

const savelayoutsUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/savelayouts";

const Layouts = () => {
  const user = getUser();
  const name = user !== "undefined" && user ? user.name : "" && user ? user.username : "";
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);

  const logoutHandler = () => {
    resetUserSession();
    navigate("/login");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (url.trim() === "") {
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
      username: user.username,
      url: url,
    };

    axios
      .post(savelayoutsUrl, requestBody, requestConfig)
      .then((response) => {
        setMessage("Layouts Saved Successfully");
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
      Hello {name}! You are currently logged in! Welcome to your layouts. <br />
      <input type="button" value="Logout" onClick={logoutHandler} />
      <form onSubmit={submitHandler}>
        <h5>Save layouts</h5>

        <div class="form">
          <div>
            Url: <input type="url" value={url} onChange={(event) => setUrl(event.target.value)} /> <br />
          </div>
        </div>

        <div>
          <input type="submit" value="Save" />
        </div>
      </form>
      {message && <p className="message">{message} </p>}
    </div>
  );
};

export default Layouts;
