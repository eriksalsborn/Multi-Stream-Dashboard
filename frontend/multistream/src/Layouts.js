import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, resetUserSession } from "./AuthService";
import axios from "axios";
import TwitchStream from "./TwitchStream";

// allows us to access the api
const saveLayoutsUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/savelayouts";
const getLayoutsUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/getlayouts";

const Layouts = () => {
    // get the current user + name
    const user = getUser();
    const name = user.name;

    // declaring new state variables
    const [twitchWindows, setTwitchWindows] = useState([]);
    const [inputText, setInputText] = useState("");
    const [message, setMessage] = useState(null);
    const [appInitiated, setAppInitiated] = useState(false);

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
            };

            // server call
            axios
                .post(saveLayoutsUrl, { twitchWindows: twitchWindows, username: user.username }, requestConfig)
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

            // if we are just navigating to layouts from another component we want to
            // retrieve the states in the database for the user
        } else {
            // fetch data
            const requestConfig = {
                headers: {
                    "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
                },
            };
            const requestBody = {
                username: user.username,
                //url: inputText,
            };

            axios
                .post(getLayoutsUrl, requestBody, requestConfig)
                .then((response) => {
                    setMessage("Layouts Updated Successfully");
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
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (inputText.trim() === "") {
            setMessage("All fields are required");
            return;
        }

        setMessage(null);

        const channel_name = inputText;
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
            },
        ];

        console.log(newState);

        setTwitchWindows(newState);
    };

    const handleClose = (toClose) => {
        setTwitchWindows(twitchWindows.filter((a) => a.url !== toClose.url));
    };

    const handleDrag = (toDrag, dx, dy) => {
        // update current state...

        toDrag.x = dx;
        toDrag.y = dy;
        setTwitchWindows(twitchWindows.map((a) => (a.url !== toDrag.url ? a : toDrag)));

        console.log(toDrag);
    };

    const handleResizeSmooth = (toResize, width, height, position) => {
        // update current state...

        toResize.height = height;
        toResize.width = width;
        toResize.x = position.x;
        toResize.y = position.y;
    };

    const handleResize = (toResize, width, height, position) => {
        toResize.height = height;
        toResize.width = width;
        toResize.x = position.x;
        toResize.y = position.y;

        setTwitchWindows(twitchWindows.map((a) => (a.url !== toResize.url ? a : toResize)));
    };

    return (
        <div class="center">
            Hello {name}! You are currently logged in! Welcome to your layouts. <br />
            <input type="button" value="Logout" onClick={logoutHandler} />
            <form onSubmit={submitHandler}>
                <h5>Save layouts</h5>

                <div class="form">
                    <div>
                        Channel name:{" "}
                        <input
                            type="text"
                            value={inputText}
                            onChange={(event) => {
                                setInputText(event.target.value);
                            }}
                        />{" "}
                        <br />
                    </div>
                </div>

                <div>
                    <input type="submit" value="Save" />
                </div>
            </form>
            {twitchWindows.map((twitchWindow) => (
                <TwitchStream
                    data={twitchWindow}
                    onDrag={handleDrag}
                    onResizeSmooth={handleResizeSmooth}
                    onClose={handleClose}
                    onResize={handleResize}
                ></TwitchStream>
            ))}
            {message && <p className="message">{message} </p>}
        </div>
    );
};

export default Layouts;
