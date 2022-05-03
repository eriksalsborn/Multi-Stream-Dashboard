import "./App.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Layouts from "./Layouts";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink activeclassname="active" to="/">
            {" "}
            Home
          </NavLink>
          <NavLink activeclassname="active" to="/register">
            {" "}
            Register
          </NavLink>
          <NavLink activeclassname="active" to="/login">
            {" "}
            Login
          </NavLink>
          <NavLink activeclassname="active" to="/layouts">
            {" "}
            Layouts
          </NavLink>
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/layouts" element={<Layouts />} />
              {/* add here if you want multiple privates */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
