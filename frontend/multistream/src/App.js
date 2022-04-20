import logo from './logo.svg';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Layouts from './Layouts';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  return (

    <div className="App">
      <BrowserRouter>

      <div className="header">
        <NavLink exact activeClassName= "active" to="/"> Home</NavLink>
        <NavLink activeClassName= "active" to="/register"> Register</NavLink>
        <NavLink activeClassName= "active" to="/login"> Login</NavLink>
        <NavLink activeClassName= "active" to="/layouts"> Layouts</NavLink>
      </div>

    <div className="content">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <PublicRoute path='/register' element={<Register/>}/>
        <PublicRoute path='/login' element={<Login/>}/>
        <PrivateRoute path='/layouts' element={<Layouts/>}/>
      </Routes>
    </div>

    </BrowserRouter>
    </div>
  );
}

export default App;