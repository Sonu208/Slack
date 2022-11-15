import React from "react";
import "./Login.css";
// import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import { useState } from "react";
import TextField from '@mui/material/TextField'; 
import { Button } from "@mui/material";
import logo2 from "../../static/image/logo2.png";
import { nameValidation, passwordValidation, emailValidation } from "./validation";

function Login() {
  const [state, dispatch] = useStateValue();
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login-container">

        {isSignIn ? (
          <span className="switchForm">
            New user?
            <Button onClick={()=>{
              setIsSignIn(false);
              setEmail("");
              setPassword("");
              setFname("");
              setLname("");
            }}>Sign Up</Button>
          </span>
        ):(
          <span className="switchForm">
            Already registered??
            <Button onClick={()=>{
              setIsSignIn(true);
              setEmail("");
              setPassword("");
              setFname("");
              setLname("");
            }}>Sign In</Button>
          </span>
        )}
        
        <img className="logo"  src={logo2} alt="dd" />
        
        <div className="form">
          {isSignIn ? (
            <form className="formContainer">
              <TextField
                required
                id="outlined-required"
                label="Email"
                type="email"
                style={{marginBottom: "10px", width: "90%"}}
                size="small"
              />
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                style={{marginBottom: "10px", width: "90%"}}
                size="small"
              />
                
                <Button className="sign-btn" type="submit" variant="outlined" >Sign In</Button>
            </form>
          ):(

            <form className="formContainer">
              
              <TextField
                required
                id="outlined-required"
                label="First Name"
                type="text"
                style={{marginBottom: "10px", width: "90%"}}
                size="small"
                onChange={(e) => setFname(e.target.value)}
                onKeyDown = {(event) => {
                  if (event.code === 'Space') event.preventDefault()
                }}

                onBlur = {(event) => {
                    const res = nameValidation(fname);
                    if (res!=""){
                      setFnameError(res);
                    }
                    else{
                      setFnameError('');
                    }
                }}
                error={fnameError!==''}
                helperText = {fnameError}
                
              />
              <TextField
                required
                id="outlined-required"
                label="Last Name"
                type="text"
                style={{marginBottom: "10px", width: "90%"}}
                size="small"
                onChange={(e) => setLname(e.target.value)}
                onKeyDown = {(event) => {
                  if (event.code === 'Space') event.preventDefault()
                }}
                onBlur = {(event) => {
                  const res = nameValidation(lname);
                  if (res!=""){
                    setLnameError(res);
                  }
                  else{
                    setLnameError('');
                  }
                }}
                error={lnameError!==''}
                helperText = {lnameError}
              />
              <TextField
                required
                id="outlined-required"
                label="Email"
                type="email"
                style={{marginBottom: "10px", width: "90%"}}
                size="small"
                onChange={(e) => setEmail(e.target.value)}
                onBlur = {(event) => {
                  const res = emailValidation(email);
                  if (res!=""){
                    setEmailError(res);
                  }
                  else{
                    setEmailError('');
                  }
                }}
                error={emailError!==''}
                helperText = {emailError}
              />
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                style={{marginBottom: "10px", width: "90%"}}
                size="small"
                onChange={(e) => setPassword(e.target.value)}

                onBlur = {(event) => {
                  const res = passwordValidation(password);
                  if (res!=""){
                    setPasswordError(res);
                  }
                  else{
                    setPasswordError('');
                  }
                }}
                error={passwordError!==''}
                helperText = {passwordError}
              
              />
              <TextField
                required
                id="outlined-required"
                label="Confirm Password"
                type="password"
                style={{marginBottom: "10px", width: "90%"}}
                size="small"
                onChange = {(event) => {
                  if(event.target.value != password){
                    setCpasswordError("Password does not match");
                  }
                  else{
                    setCpasswordError("");
                  }
                }}
                error={cpasswordError!==''}
                helperText = {cpasswordError}
              />
              
              <Button className="sign-btn" type="submit" variant="outlined" >Sign Up</Button>
            </form>
            

          )}
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
