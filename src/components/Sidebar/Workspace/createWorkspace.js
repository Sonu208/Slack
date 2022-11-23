import React from "react"
import "./workspace.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

export const CreateWorkspace = ({setselectworkspace, setcreateworkspace}) => {

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    

    return(
        <React.Fragment>
            
            <div className="background">
                <div className="card">
                    <div className="card-header">
                        <h2>Create a workspace</h2>
                        <span className="close" onClick={()=>{
                            setselectworkspace(false);
                            setcreateworkspace(false);
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
                            setName(event.target.value);
                            
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
                    
                    <div>
                        <Button variant="contained" color="primary" onClick={()=>{
                            setselectworkspace(true);
                            setcreateworkspace(false);
                        }}><ArrowBackIosIcon/> Go Back</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    ) 
  }