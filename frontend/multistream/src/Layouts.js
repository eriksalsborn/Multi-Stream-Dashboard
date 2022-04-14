import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, resetUserSession } from './AuthService';


const Layouts = () => {

  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';
  const navigate = useNavigate(); 

  const logoutHandler = () => {
    resetUserSession();
    navigate('/login');
  }
  return (
    <div>
      Hello {name}! You are currently logged in! Welcome to your layouts. <br />
      <input type="button" value="Logout" onClick={logoutHandler} />
    </div>
  )
}

export default Layouts;