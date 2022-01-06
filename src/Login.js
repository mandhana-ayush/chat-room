import React, { useContext } from 'react'
import { DispatchContext} from './App';
import {auth, provider } from './firebase';

import Logo from './Logo/Logo.png';

const Login = ({setMethod}) => {
  const dispatch = useContext(DispatchContext);

  const signUpHandler = ()=>{
    auth.signInWithPopup(provider).then((result)=>{
      console.log(result);
      dispatch({
        type:"PERSON_INFO",
        payload:result.user,
      })
      setMethod(true);
    })
    .catch((err)=>{
      alert(err.message);
    })
  }
  return (
    <div className = "login-page">
      <img src={Logo} alt="" />
      <h1>Sign in to ChatRoom</h1>
      <button onClick = {signUpHandler}>Sign in with Google</button>
    </div>
  )
}

export default Login
