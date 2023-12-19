import "./App.css"
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import Layouts from "./Layouts"
import PrivateRoute from "./PrivateRoute"

function App() {
    //Allows the user to navigate through the pages
    return (
        <div className="App">
            <BrowserRouter>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/layouts" element={<Layouts />} />
                       
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
