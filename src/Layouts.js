import React, { useState } from "react"
import CreateWindow from "./CreateWindow"
import { slide as Menu } from "react-burger-menu"

const Layouts = () => {

    const [windows, setWindows] = useState([])
    const [twText, setTwText] = useState("") 
    const [ytText, setYtText] = useState("") 
    const [message, setMessage] = useState(null) 
    const [darkmode, setDarkmode] = useState(false) 

    const darkMode = () => {
        const darkorlight = document.getElementById("darkmode_button")

        if (darkmode === false) {
            document.body.style.backgroundColor = "#000033"
            darkorlight.value = "Light Mode"
            setDarkmode(true)
        } else {
            document.body.style.backgroundColor = "#d2d6e6"
            darkorlight.value = "Dark Mode"
            setDarkmode(false)
        }
    }

    const submitHandlerYT = (event) => {
        event.preventDefault()

        if (ytText.trim() === "") {
            setMessage("All fields are required")
            return
        }

        let channel_name = ytText
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
            },
        ]

        setYtText("")
        setWindows(newState)
    }

    const submitHandlerTW = (event) => {
        event.preventDefault()

        if (twText.trim() === "") {
            setMessage("All fields are required")
            return
        }

        let channel_name = twText
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
            },
        ]
        setTwText("")
        setWindows(newState)
    }

    const handleClose = (toClose) => {
        setWindows(windows.filter((a) => a.url !== toClose.url))
    }

    const handleDrag = (toDrag, dx, dy) => {
        toDrag.x = dx
        toDrag.y = dy
        setWindows(windows.map((a) => (a.url !== toDrag.url ? a : toDrag)))
    }

    const handleResize = (toResize, width, height, position) => {
        toResize.height = height
        toResize.width = width
        toResize.x = position.x
        toResize.y = position.y

        setWindows(windows.map((a) => (a.url !== toResize.url ? a : toResize)))
    }

    const windowNames = windows.map((i) => i.layout)
    const unique = new Array(...new Set([...windowNames]))

    return (
        <div>
            <Menu right Overlay>
                <input id="darkmode_button" type="button" value="Dark Mode" onClick={darkMode} />
                <h5 id="bm-text"> Enjoy that game...</h5>

                <div id="form_tw">
                    <img src="twitch_logo.png" height="78"/>
                    <form onSubmit={submitHandlerTW}>
                        <input
                            id="forminput"
                            type="text"
                            placeholder="Twitch Channel"
                            value={twText}
                            onChange={(event) => {
                                setTwText(event.target.value)
                            }}
                        />{" "}
                        <br />
                        <input 
                            id="button-overlay-green" 
                            type="submit" 
                            value="Add" 
                            disabled={!twText}
                        />
                    </form>
                </div>

                <h5 id="bm-text"> Watch that cat video... </h5>

                <div id="form_yt">
                    <img src="youtube_logo.png" height="78" />
                    <form onSubmit={submitHandlerYT}>
                        <input
                            id="forminput"
                            type="text"
                            placeholder="YouTube URL"
                            value={ytText}
                            onChange={(event) => {
                                setYtText(event.target.value)
                            }}
                        />{" "}
                        <input 
                            id="button-overlay-green" 
                            type="submit" 
                            value="Add" 
                            disabled={!ytText}
                        />
                    </form>
                </div>
            </Menu>

            {windows.map((windows) => (
                <CreateWindow
                    data={windows}
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
