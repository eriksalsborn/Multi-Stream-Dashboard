import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser, getToken, resetUserSession } from "./AuthService"
import axios from "axios"
import CreateWindow from "./CreateWindow"
import { slide as Menu } from "react-burger-menu"

// allows us to access the api
const saveLayoutsUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/savelayouts"
const getLayoutsUrl = "https://hie7efmkul.execute-api.eu-north-1.amazonaws.com/prod/getlayouts"

const Layouts = () => {
    // get the current user + name + token
    //const user = getUser()
    //const name = user.name
    //const token = getToken()

    // declaring new state variables
    const [windows, setWindows] = useState([]) // windows contains information about each streaming window - url, size etc..
    const [appInitiated, setAppInitiated] = useState(false) // used for keeping track if we should GET or SAVE windows
    const [inputText, setInputText] = useState("") // used in forms
    const [message, setMessage] = useState(null) // used for error messages
    const [currentLayout, setCurrentLayout] = useState("") //  used for keeping information about the layout of windows
    const [darkmode, setDarkmode] = useState(false) // used for keeping track if we are using dark mode or not

    // hook that runs after each render / when state variable window is updated

    /*

    useEffect(() => {
        // If - appInitiated is true (meaning we have are already on the component)- then we want to update SAVE windows to the database
        
        if (appInitiated) {
            // required for call to server
            const requestConfig = {
                headers: {
                    "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
                },
            }

            // what we want to send (post) to the server lambda function
            const requestBody = {
                username: user.username,
                url: inputText,
                token: token,
            }

            // server call SAVE
            axios
                .post(
                    saveLayoutsUrl,
                    {
                        windows: windows,
                        username: user.username,
                        token: token,
                    },
                    requestConfig
                )
                .then((response) => {
                    //setMessage("Layouts Saved Successfully");
                })
                .catch((error) => {
                    if (error.response.status === 401 || error.response.status === 403) {
                        setMessage(error.response.data.message)
                    }
                })

            // ELSE - if appInitiated is true (meaning we just arrived to the component) we want to GET the windows in the database for the user
        } else {
            // hiding some elements as default
            document.getElementById("form").style.display = "none"
            document.getElementById("formtwitch").style.display = "none"
            document.getElementById("dropdown_switch").style.display = "none"

            // fetch data
            const requestConfig = {
                headers: {
                    "x-api-key": "1fJBeucWw45uBdz97bK4t3iio2gHgdjIaR3d9Lmy",
                },
            }
            const requestBody = {
                username: user.username,
                token: token,
            }

            // server call GET
            axios
                .post(getLayoutsUrl, requestBody, requestConfig)
                .then((response) => {
                    setWindows(response.data.layouts)
                })
                .catch((error) => {
                    if (error.response.status === 401 || error.response.status === 403) {
                        setMessage(error.response.data.message)
                    }
                })

            setAppInitiated(true)
        }
    }, [windows])

    */

    let navigate = useNavigate()
    const logoutHandler = () => {
        resetUserSession()
        navigate("/login")
    }

    const darkMode = () => {
        const darkorlight = document.getElementById("darkmode_button")

        if (darkmode === false) {
            document.body.style.backgroundColor = "#000033"
            darkorlight.value = "Light Mode"
            setDarkmode(true)
        } else {
            document.body.style.backgroundColor = "#D2D6E6"
            darkorlight.value = "Dark Mode"
            setDarkmode(false)
        }
    }

    // Function for hiding form on click - Youtube
    const hideFormYT = () => {
        const form = document.getElementById("form")
        const formtwitch = document.getElementById("formtwitch")
        const forminput = document.getElementById("forminput")
        const formtwitchinput = document.getElementById("formtwitchinput")

        if (form.style.display === "none") {
            // Show
            form.style.display = "block"
            if (formtwitch.style.display === "block") {
                formtwitch.style.display = "none"
            }
        } else {
            // Hide
            form.style.display = "none"
        }

        forminput.value = ""
        formtwitchinput.value = ""
    }

    // Function for hiding form on click - Twitch
    const hideFormTW = () => {
        const form = document.getElementById("form")
        const formtwitch = document.getElementById("formtwitch")
        const forminput = document.getElementById("forminput")
        const formtwitchinput = document.getElementById("formtwitchinput")

        if (formtwitch.style.display === "none") {
            // show
            formtwitch.style.display = "block"
            if (form.style.display === "block") {
                form.style.display = "none"
            }
        } else {
            // hide
            formtwitch.style.display = "none"
        }

        forminput.value = ""
        formtwitchinput.value = ""
    }

    const hideLayoutDropdown = () => {
        const dropdown = document.getElementById("dropdown_switch")

        if (dropdown.style.display === "none") {
            // show
            dropdown.style.display = "block"
        } else {
            // hide
            dropdown.style.display = "none"
        }
    }

    // Function for displaying a prompt for user to input new layout name
    const addLayoutPrompt = () => {
        const dropdown = document.getElementById("dropdown_switch")

        let sign = prompt("What do you want your new layout to be called?")
        // hide
        dropdown.style.display = "none"

        // if user presses cancel or if user doesnt provide a name..
        if (sign === null || sign === "") {
            return //break
        }

        setCurrentLayout(sign)
    }

    // Function for handling (adding) a new youtube-window
    const submitHandlerYT = (event) => {
        event.preventDefault()

        if (inputText.trim() === "") {
            setMessage("All fields are required")
            return
        }

        let channel_name = inputText
        channel_name = channel_name.substr(32)

        const src = "https://www.youtube.com/embed/" + channel_name

        const newState = [
            ...windows,
            {
                url: src,
                width: 407,
                height: 228,
                x: 100,
                y: 100,
                scale: 1.0,
                layout: currentLayout,
            },
        ]

        hideFormYT()
        setInputText("")
        setWindows(newState)
    }

    // Function for handling (adding) a new twitch-window
    const submitHandlerTW = (event) => {
        event.preventDefault()

        if (inputText.trim() === "") {
            setMessage("All fields are required")
            return
        }

        let channel_name = inputText
        const src = "https://player.twitch.tv/?channel=" + channel_name + "&parent=localhost&muted=true"

        const newState = [
            ...windows,
            {
                url: src,
                width: 407,
                height: 228,
                x: 100,
                y: 100,
                scale: 1.0,
                layout: currentLayout,
            },
        ]

        hideFormTW()
        setInputText("")
        setWindows(newState)
    }

    // Function for removing a window
    const handleClose = (toClose) => {
        setWindows(windows.filter((a) => a.url !== toClose.url))
    }

    // Function for handling dragging a window
    const handleDrag = (toDrag, dx, dy) => {
        toDrag.x = dx
        toDrag.y = dy
        setWindows(windows.map((a) => (a.url !== toDrag.url ? a : toDrag)))
    }

    // Function for handling resizing of a window
    const handleResize = (toResize, width, height, position) => {
        toResize.height = height
        toResize.width = width
        toResize.x = position.x
        toResize.y = position.y

        setWindows(windows.map((a) => (a.url !== toResize.url ? a : toResize)))
    }

    // Retrieving all layout names of windows
    const windowNames = windows.map((i) => i.layout)
    // Retrieving all uniquee layout names of windows
    const unique = new Array(...new Set([...windowNames]))
    // To be used in the dropdown for selecting layout

    return (
        <div>
            <Menu right noOverlay>
                <h5> Welcome </h5>
                <h5> Add a stream </h5>

                <div id="border">
                    <input type="image" src="youtube_logo.png" height="68" onClick={hideFormYT} />
                </div>

                <form id="form" onSubmit={submitHandlerYT}>
                    <input
                        id="forminput"
                        type="text"
                        placeholder="YouTube URL"
                        value={inputText}
                        onChange={(event) => {
                            setInputText(event.target.value)
                        }}
                    />{" "}
                    <input id="button-overlay-green" type="submit" value="Add" />
                </form>

                <div id="border">
                    <input type="image" src="twitch_logo.png" height="78" onClick={hideFormTW} />
                </div>

                <form id="formtwitch" onSubmit={submitHandlerTW}>
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
                    <input id="button-overlay-green" type="submit" value="Add" />
                </form>

                <input id="button-overlay" type="button" value="Switch Layout" onClick={hideLayoutDropdown} />
                <select id="dropdown_switch" value={currentLayout} onChange={(e) => setCurrentLayout(e.target.value)}>
                    {unique.map((i) => (
                        <option>{i}</option>
                    ))}
                </select>

                <input id="button-overlay" type="button" value="Add New Layout" onClick={addLayoutPrompt} />
                <input id="darkmode_button" type="button" value="Dark Mode" onClick={darkMode} />
                <input id="button-overlay" type="button" value="Logout" onClick={logoutHandler} />
            </Menu>

            {windows.map((windows) => (
                <CreateWindow
                    data={windows}
                    layout={currentLayout}
                    onDrag={handleDrag}
                    onClose={handleClose}
                    onResize={handleResize}
                ></CreateWindow>
            ))}
            {message && <p className="message">{message} </p>}
        </div>
    )
}

export default Layouts
