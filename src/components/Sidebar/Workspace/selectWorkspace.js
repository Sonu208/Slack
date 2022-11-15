import "./workspace.css"
import React from "react";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export const SelectWorkspace = ({setselectworkspace, setcreateworkspace}) => {
    return(
        <React.Fragment>
            <div className="background">
                <div className="card">
                    <div className="card-header">
                        <h2>Select a workspace</h2>
                        <span className="close" onClick={()=>{
                            setselectworkspace(false);
                            setcreateworkspace(false);
                        }}><CloseIcon/></span>
                    </div>
                    <div className="workspaces">
                        display available workspaces
                    </div>
                    <div>
                        <Button variant="contained" color="success" onClick={()=>{
                            setselectworkspace(false);
                            setcreateworkspace(true);
                        }}><AddIcon/> create a new workspace</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    ) 
  }