import React from "react";
import "./Login.css";
import axios from "axios";
// import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import { useState } from "react";
import TextField from '@mui/material/TextField'; 
import { Button } from "@mui/material";
import logo2 from "../../static/image/logo2.png";
import { nameValidation, passwordValidation, emailValidation } from "./validation";
import profile1 from "../../static/image/profile1.png";
import profile2 from "../../static/image/profile2.png";
import profile3 from "../../static/image/profile3.png";
import profile4 from "../../static/image/profile4.png";
import profile5 from "../../static/image/profile5.png";

function Login() {
  const [state, dispatch] = useStateValue();
  const [isSignIn, setIsSignIn] = useState(false);

  const [signInError, setIsSignInError] = useState('');
  const [signUpError, setIsSignUpError] = useState('');
  const [formError, setFormError] = useState('');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");

  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");

  const manualSignIn = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'https://slack-clone2022.herokuapp.com/user/login',

      data: {
        email: email,
        password: password,
      },

      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log('Logged in Successfully !');
          // alert('Signed Up Successfully !');
          localStorage.setItem(
            'login',
            JSON.stringify({
              login: true,
              id: res.data.uid, //user ID
              user: email, //email

              userName: res.data.username, //Name
              fname: res.data.first_name,
              lname: res.data.last_name,
              profileImage: res.data.profile, //Prof Img
              login_type: res.data.login_type,
              user_type: res.data.user_type,
              role: res.data.role
            })
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
        setFormError(err.message);
      });
  }

  const manualSignUp = (e) => {
    e.preventDefault();
    const r = Math.random() * (6 - 1) + 1;
    const profileImg = r < 2 ? profile1 : r < 3 ? profile2 : r < 4 ? profile3 : r < 5 ? profile4 : profile5;

    var profileString = '';
    // let reader = new FileReader();
    // reader.onloadend = function() {
    //   profileString = reader.result;
    // }
    // reader.readAsDataURL(profileImg);
    axios({
      method: 'post',
      url: 'https://slack-clone2022.herokuapp.com/user/',

      data: {
        username: username,
        first_name: fname,
        last_name: lname,
        email: email,
        profile: profileImg,
        password: password,
        login_type: 0,
        user_type: "employee",
        role: "backend"
      },

      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log('Signed Up Successfully !');
          alert('Signed Up Successfully !');
          localStorage.setItem(
            'login',
            JSON.stringify({
              login: true,
              id: res.data.userInfo._id, //user ID
              email: res.data.userInfo.email, //email
              userName: username, //Name
              fname: fname,
              lname: lname,
              profileImage: profileImg, //Prof Img
              login_type: 0,
              user_type: "employee",
              role: "backend"
            })
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
        setFormError(err.message);
      });
  }

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        localStorage.setItem(
          'login',
          JSON.stringify({
            login: true,
            id: result.additionalUserInfo.profile.id, //user ID
            email: result.additionalUserInfo.profile.email, //email
            userName: result.additionalUserInfo.profile.email.split('@')[0], //Name
            fname: result.additionalUserInfo.profile.given_name,
            lname: result.additionalUserInfo.profile.family_name,
            profileImage: result.additionalUserInfo.profile.picture, //Prof Img
            login_type: 1,
            user_type: "employee",
            role: "backend"
            
          }))
          // axios({
          //   method: 'post',
          //   url: 'https://slack-clone2022.herokuapp.com/user/',
      
          //   data: {
          //     username: result.additionalUserInfo.profile.email.split('@')[0],
          //     fname: result.additionalUserInfo.profile.given_name,
          //     lname: result.additionalUserInfo.profile.family_name,
          //     email: result.additionalUserInfo.profile.email,
          //     profileImage: result.additionalUserInfo.profile.picture, //Prof Img
          //     login_type: 1,
          //     user_type: "employee",
          //     role: "backend",
          //     password:''
          //   },
      
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // }).catch().then((res)=>{})
      })
      .catch((error) => {
        console.log(error.message);
        setFormError(error.message);
      });
      
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
              setFormError("");
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
              setFormError("");
            }}>Sign In</Button>
          </span>
        )}
        
        <img className="logo"  src={logo2} alt="dd" />
        
        <div className="form" >
          {isSignIn ? (
            <form className="formContainer">
              <TextField
                required
                id="outlined-required"
                label="Email"
                type="email"
                style={{marginBottom: "10px", width: "90%"}}
                size="small"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                style={{marginBottom: "10px", width: "90%"}}
                size="small"
                onChange={(e) => setPassword(e.target.value)}
              />
              {formError ? <p className="error">{formError}</p> : null}
              <br></br>
                
                <Button className="sign-btn" type="submit" variant="outlined" onClick={manualSignIn} >Sign In</Button>
            </form>
          ):(

            <form className="formContainer" >
              
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
                    if (res!==""){
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
                  if (res!==""){
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
                label="Username"
                type="text"
                style={{marginBottom: "10px", width: "90%"}}
                size="small"
                onChange={(e) => setUsername(e.target.value)}
                onBlur = {(event) => {
                  const res = nameValidation(lname);
                  if (res!==""){
                    setUsernameError(res);
                  }
                  else{
                    setUsernameError('');
                  }
                }}
                error={usernameError!==''}
                helperText = {usernameError}
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
                  if (res!==""){
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
                  if (res!==""){
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
                  if(event.target.value !== password){
                    setCpasswordError("Password does not match");
                  }
                  else{
                    setCpasswordError("");
                  }
                }}
                error={cpasswordError!==''}
                helperText = {cpasswordError}
              />
              {formError ? <p className="error">{formError}</p> : null}
              <br></br>
              <Button className="sign-btn" type="submit" variant="outlined" onClick={manualSignUp}
              disabled={fnameError!=='' || lnameError!=='' || emailError!=='' || passwordError!=='' || cpasswordError!=='' || fname==='' || lname==='' || email==='' || password==='' || username==='' || usernameError!==''}
               >Sign Up</Button>
            </form>
            

          )}
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
