import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import "./SidebarOption.css";
import { useHistory } from "react-router-dom";
// import db from "../../../firebase";
// import { create } from "@mui/material/styles/createTransitions";

function SidebarOption({ Icon, title, id, addChannelOption }) {
  const history = useHistory();

  const [channelName, setChannelName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [createChannel, setCreateChannel] = React.useState(false);
  const [createChat, setCreateChat] = React.useState(false);
  const [chatUser, setChatUser] = React.useState("");

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push("/title/");
    }
  };

  const addChannel = () => {
    // const channelName = prompt("Enter the channel name");

    // if (channelName) {
    //   db.collection("rooms").add({
    //     name: channelName,
    //   });
    // }

    if(title==="Add Channel"){

      setCreateChannel(!createChannel);
    
    }
    else if (title==="Add Chat"){
      setCreateChat(true);

    }

  
  };

  const submitCreateChannel = ()=>{
    const data = {
      wid:'',
      cname:channelName,
      cdesc:description,
    }
    axios({
      method: 'post',
      url: 'https://slack-clone2022.herokuapp.com/channel/',
      data: data,

      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Channel created");
          setCreateChannel(!createChannel);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const submitChatUser = ()=>{
    const data = {
      uid:'',
      wid:'',
      pid:''
      
    }
    axios({
      method: 'post',
      url: 'https://slack-clone2022.herokuapp.com/channel/',
      data: data,

      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Channel created");
          setCreateChat(!createChat);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <React.Fragment>
            {createChannel && 
        <React.Fragment>
            
        <div className="background">
            <div className="card">
                <div className="card-header">
                    <h2>Create a channel</h2>
                    <span className="close" onClick={()=>{                
                        setCreateChannel(false);
                    }}><CloseIcon/></span>
                </div>
                <div className="workspaces">
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    type="text"
                    
                    style={{marginBottom: "10px", width: "90%"}}
                    size="small"
                    onChange = {(event) => {
                        setChannelName(event.target.value);
                        
                    }}
                    
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Description"
                    type="text"
                    multiline
                    rows={4}
                    style={{marginBottom: "10px", width: "90%"}}
                    size="small"
                    onChange = {(event) => {
                        setDescription(event.target.value);
                    }}
                    
                />
                <Button  variant="contained" color="success" onClick={submitCreateChannel} >Create</Button>
                </div>

            </div>
        </div>
    </React.Fragment>
      }
      {createChat && 
        <React.Fragment>
            
        <div className="background">
            <div className="card">
                <div className="card-header">
                    <h2>Start a new chat!</h2>
                    <span className="close" onClick={()=>{                
                        setCreateChat(!createChat);
                    }}><CloseIcon/></span>
                </div>
                <div className="workspaces">
                <TextField
                    required
                    id="outlined-required"
                    label="Email or username"
                    type="text"
                    
                    style={{marginBottom: "10px", width: "90%"}}
                    size="small"
                    onChange = {(event) => {
                        setChatUser(event.target.value);
                        
                    }}
                    
                />
                
                <Button  variant="contained" color="success" onClick={submitChatUser} >Start</Button>
                </div>

            </div>
        </div>
    </React.Fragment>
      }

      <div
        className="sidebarOption"
        onClick={addChannelOption ? addChannel : selectChannel}
      >

        {Icon && <Icon className="sidebarOption-icon" />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <h3 className="sidebarOption-channel">
            <span className="sidebarOption-hash">#</span> {title}
          </h3>
        )}
      </div>
    </React.Fragment>
  );
}

export default SidebarOption;
