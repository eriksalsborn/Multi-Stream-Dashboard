
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser, getToken,resetUserSession } from "./AuthService"
import axios from "axios"
import TwitchStream from "./TwitchStream"
import { slide as Menu } from 'react-burger-menu'


// allows us to access the api
const saveLayoutsUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/savelayouts";
const getLayoutsUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/getlayouts";

const Layouts = () => {
    // get the current user + name
    const user = getUser();
    const name = user.name;
    const token = getToken();

    // declaring new state variables
  const [twitchWindows, setTwitchWindows] = useState([])
  const [inputText, setInputText] = useState("")
  const [inputTextLayouts, setInputTextLayouts] = useState("")
  const [message, setMessage] = useState(null)
  const [appInitiated, setAppInitiated] = useState(false)
  const [current_layout, setCurrentLayout] = useState("")
  const [visible, setVisible] = useState(false)

    // hook that runs after each render / state variables updated
    useEffect(() => {
      // If this isnt our first time doing stuff
      if (appInitiated) {
          // required for call to server
          const requestConfig = {
              headers: {
                  "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
              },
          };


          // what we want to send (post) to the server lambda function
          const requestBody = {
              username: user.username,
              url: inputText,
              token: token,
          };

          // server call
          axios
              .post(saveLayoutsUrl, { twitchWindows: twitchWindows, username: user.username, token: token }, requestConfig)
              .then((response) => {
                  //setMessage("Layouts Saved Successfully");
              })
              .catch((error) => {
                  if (error.response.status === 401 || error.response.status === 403) {
                      setMessage(error.response.data.message);
                  } else {
                      setMessage("Sorry... The backend server is down. Please try again later.");
                  }
              });

          // if we are just navigating to layouts from another component we want to
          // retrieve the states in the database for the user
      } else {
          // fetch data
          document.getElementById("form").style.display = "none";
          document.getElementById("formtwitch").style.display = "none";

          const requestConfig = {
              headers: {
                  "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
              },
          };
          const requestBody = {
              username: user.username,
              token: token,
              //url: inputText,
          };

          axios
              .post(getLayoutsUrl, requestBody, requestConfig)
              .then((response) => {
                  //setMessage("Layouts Updated Successfully");
                  //console.log(response.data);
                  setTwitchWindows(response.data.layouts);
                  //console.log("Erik");
                  //console.log(twitchWindows)
              })
              .catch((error) => {
                  if (error.response.status === 401 || error.response.status === 403) {
                      setMessage(error.response.data.message);
                  } else {
                      setMessage("Sorry... The backend server is down. Please try again later.");
                  }
              });

          setAppInitiated(true);
      }
  }, [twitchWindows]);

  // hook returns a function
  let navigate = useNavigate();

  const logoutHandler = () => {
      resetUserSession();
      navigate("/login");
  }

  const darkMode = () => {
      const darkorlight = document.getElementById("darkmode");

      if (document.body.style.backgroundColor === "white") {
          document.body.style.backgroundColor = "black";
          darkorlight.value = "Light Mode";
      } else {
          document.body.style.backgroundColor = "white";
          darkorlight.value = "Dark Mode";
      }
  }

  // When clicking add button
  const popUpInput = () => {
      const form = document.getElementById("form");
      const formtwitch = document.getElementById("formtwitch");
      const forminput = document.getElementById("forminput");
      const formtwitchinput = document.getElementById("formtwitchinput");

      if (form.style.display === "none") {
          // 👇️ this SHOWS the form
          form.style.display = "block";
          if (formtwitch.style.display === "block") {
              formtwitch.style.display = "none";
          }
      } else {
          // 👇️ this HIDES the form
          form.style.display = "none";
      }

      forminput.value = "";
      formtwitchinput.value = "";
  }

  {/* <Popup visible={visible} onClose={() => setVisible(false)}>
    <p>I am a popup!</p>
  </Popup> */}

  /* const darkorlight = document.getElementById('darkmode')

  if (document.body.style.backgroundColor === "white") {
    document.body.style.backgroundColor = "black"
    darkorlight.value = "Light Mode"
  }
  else {
    document.body.style.backgroundColor = "white"
    darkorlight.value = "Dark Mode"
  } */



const addLayoutPrompt = () => {

  let sign = prompt("What do you want your new layout to be called?")
  //setInputTextLayouts(sign)

  // if user presses cancel..  if user doesnt provide a name..
  if (sign === null || sign === '') {
    return; //break out of the function early
  }

  setCurrentLayout(sign)
}

const popUpInputTwitch = () => {
    const form = document.getElementById("form");
    const formtwitch = document.getElementById("formtwitch");
    const forminput = document.getElementById("forminput");
    const formtwitchinput = document.getElementById("formtwitchinput");

    if (formtwitch.style.display === "none") {
        // 👇️ this SHOWS the form
        formtwitch.style.display = "block";
        if (form.style.display === "block") {
            form.style.display = "none";
        }
    } else {
        // 👇️ this HIDES the form
        formtwitch.style.display = "none";
    }

    forminput.value = "";
    formtwitchinput.value = "";
}

const submitHandlerLayout = (event) => {
  event.preventDefault();

  if (inputTextLayouts.trim() === "") {
    return
  }

  setCurrentLayout(inputTextLayouts)
}

const submitHandlerTwitch = (event) => {
    event.preventDefault();

    if (inputText.trim() === "") {
        setMessage("All fields are required");
        return;
    }

    let channel_name = inputText;
    const src = "https://player.twitch.tv/?channel=" + channel_name + "&parent=localhost&muted=true";

    const newState = [
        ...twitchWindows,
        {
            url: src,
            width: 407,
            height: 228,
            x: 100,
            y: 100,
            scale: 1.0,
            layout: current_layout
        },
    ];

    setInputText("")
    setTwitchWindows(newState);
};

const submitHandler = (event) => {
  event.preventDefault();

      if (inputText.trim() === "") {
          setMessage("All fields are required");
          return;
      }

      let channel_name = inputText;
      channel_name = channel_name.substr(32);

      const src = "https://www.youtube.com/embed/" + channel_name;

  const newState = [
    ...twitchWindows,
    {
      url: src,
      width: 407,
      height: 228,
      x: 100,
      y: 100,
      scale: 1.0,
      layout: current_layout
    },
  ]

  setInputText("")
  setTwitchWindows(newState)
}

const handleClose = (toClose) => {
    setTwitchWindows(twitchWindows.filter((a) => a.url !== toClose.url));
}


const handleDrag = (toDrag, dx, dy) => {

  toDrag.x = dx
  toDrag.y = dy
  setTwitchWindows(twitchWindows.map((a) => (a.url !== toDrag.url ? a : toDrag)))

}

const handleResizeSmooth = (toResize, width, height, position) => {

  toResize.height = height
  toResize.width = width
  toResize.x = position.x
  toResize.y = position.y

}

const handleResize = (toResize, width, height, position) => {
  toResize.height = height
  toResize.width = width
  toResize.x = position.x
  toResize.y = position.y

  setTwitchWindows(twitchWindows.map((a) => (a.url !== toResize.url ? a : toResize)))

}


  const windowNames = twitchWindows.map(i => i.layout)
  const unique = new Array(...new Set([...windowNames]))

  return (
    
    <div>

      <Menu right noOverlay >

        <h5 id="border_bottom"> {user.name}, click to add a window </h5>

        <div id="border">
          <input type="image" src="youtube_logo.png" height="68" onClick={popUpInput} />
        </div>

        <form id="form" onSubmit={submitHandler}>
          <input
            id="forminput" 
            type="text"
            placeholder="YouTube URL"
            value={inputText}
            onChange={(event) => {
              setInputText(event.target.value)
            }}
          />{" "}

            <input id="greenbutton" type="submit" value="Add" />
      
        </form>
          
        
        <div id="border">
          <input type="image" src="twitch_logo.png" height="78" onClick={popUpInputTwitch} />
        </div>

        <form id="formtwitch" onSubmit={submitHandlerTwitch}>

            <input
              id="formtwitchinput"
              type="text"
              placeholder="Twitch Channel Name"
              value={inputText}
              onChange={(event) => {
                setInputText(event.target.value)
              }}
            />{" "}
            <br />
            
            <input id="greenbutton" type="submit" value="Add" />

        </form>


        <select value={current_layout} onChange={(e) => setCurrentLayout(e.target.value)}>
          {unique.map(i => <option>{i}</option>)}
        </select>

        {/* <div id="border">
          <form id="form" onSubmit={submitHandlerLayout}> 
              <input
                id=""
                type="text"
                placeholder="Layout"
                value={inputTextLayouts}
                onChange={(event) => {
                  setInputTextLayouts(event.target.value)
                }}
              />{" "}
              <br />
          </form>
        </div> */}

        <input id="greenbutton" type="button" value="Add New Layout" onClick={addLayoutPrompt} />
        <input id="darkmode" type="button" value="Dark Mode" onClick={darkMode} />
        <input id="border" type="button" value="Logout" onClick={logoutHandler} />
        
        </Menu>

      {twitchWindows.map((twitchWindow) => (
        <TwitchStream data={twitchWindow} layout={current_layout} onDrag={handleDrag} onResizeSmooth={handleResizeSmooth} onClose={handleClose} onResize={handleResize}></TwitchStream>
      ))}
      {message && <p className="message">{message} </p>}
    </div>
  )
}


export default Layouts;

