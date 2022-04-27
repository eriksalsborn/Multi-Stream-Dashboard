import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, resetUserSession } from "./AuthService";
import axios from "axios";
import TwitchStream from "./TwitchStream"

const layoutsUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/savelayouts";

const Layouts = () => {

  const user = getUser();
  const name = user !== "undefined" && user ? user.name : "" && user ? user.username : "";
  const navigate = useNavigate();

  const [twitchWindows, setTwitchWindows] = useState([]);
  const [inputText, setInputText] = useState("")
  const [message, setMessage] = useState(null);
  const [appInitiated, setAppInitiated] = useState(false)
  
  useEffect(() => {
    if (appInitiated) {
        // post axios twitchWindows
    const requestConfig = {
      headers: {
        "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
      },
    };
    const requestBody = {
      username: user.username,
      url: inputText,
    };

    //alert('sent req')

    axios
      .post(layoutsUrl, {twitchWindows: twitchWindows, username: user.username}, requestConfig)
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
 
    } else {
      // fetch data

      const requestConfig = {
        headers: {
          "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
        },
      };
      const requestBody = {
        username: user.username,
        url: inputText,
      };

      axios
      .get(layoutsUrl, requestConfig)
      .then((response) => {
        setMessage("Layouts Updated Successfully")
        console.log(response)
        //console.log(twitchWindows)
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Sorry... The backend server is down. Please try again later.");
        }
      });

      setAppInitiated(true)
    }
  }, [twitchWindows])

  const logoutHandler = () => {
    resetUserSession();
    navigate("/login");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (inputText.trim() === "") {
      setMessage("All fields are required");
      return;
    }

    setMessage(null);

    const channel_name = inputText;
    const src = "https://player.twitch.tv/?channel=" + channel_name + "&parent=localhost&muted=true"

    const newState = [...twitchWindows, {
      url: src,
      x: 100,
      y: 100,
      scale: 1.0
    }]

    console.log(newState)

    setTwitchWindows(newState);
  };

  const handleClose = (toClose) => {
    setTwitchWindows(twitchWindows.filter(a => a.url !== toClose.url))
  }

  const handleDrag = (toDrag, dx, dy) => {
    // update current state...
  }

  return (
    <div class="center">

      Hello {name}! You are currently logged in! Welcome to your layouts. <br />
      <input type="button" value="Logout" onClick={logoutHandler} />
      <form onSubmit={submitHandler}>

        <h5>Save layouts</h5>

        <div class="form">
          <div>
            Channel name: <input type="text" value={inputText} onChange={(event) => { setInputText(event.target.value) }  } /> <br />
          </div>
        </div>

        <div>
          <input type="submit" value="Save" />
        </div>

      </form>
      {twitchWindows.map(twitchWindow => <TwitchStream data={twitchWindow} onDrag={handleDrag} onClose={handleClose}></TwitchStream>)}
      {message && <p className="message">{message} </p>}
    </div>
  );
};

export default Layouts;
