import React from "react";
import "../Workspace/workspace.css"

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

    setCreateChannel(!createChannel);
  
  };

  return (
    <div
      className="sidebarOption"
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {createChannel && 
        <React.Fragment>
            
        <div className="background">
            <div className="card">
                <div className="card-header">
                    <h2>Create a channel</h2>
                    <span className="close" onClick={()=>{                
                        setCreateChannel(!createChannel);
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
                <Button  variant="contained" color="success" >Create</Button>
                </div>
                
                {/* <div>
                    <Button variant="contained" color="primary" onClick={()=>{
                        setselectworkspace(true);
                        setcreateworkspace(false);
                    }}><ArrowBackIosIcon/> Go Back</Button>
                </div> */}
            </div>
        </div>
    </React.Fragment>
      }
      {Icon && <Icon className="sidebarOption-icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption-channel">
          <span className="sidebarOption-hash">#</span> {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
