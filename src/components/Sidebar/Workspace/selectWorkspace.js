import "./workspace.css"
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export const SelectWorkspace = ({setselectworkspace, setcreateworkspace}) => {

    const [workspaces, setWorkspaces] = React.useState([]);

    useEffect(() => {
    

    console.log(localStorage.getItem('login'));
    const userId = localStorage.getItem('login').id;

      axios({
            method: 'get',
            url: `https://slack-clone2022.herokuapp.com/workspace/user/${userId}`,
    
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                console.log("Workspaces received", res.data);
                setWorkspaces(res.data);
                // setcreateworkspace(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } 
    , [])
    

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
                        {workspaces.map((workspace)=>{
                         
                                <div className="workspace">
                                    <h3>{workspace.wname}</h3>
                                    <p>{workspace.desc}</p>
                                </div>
                            
                        })}
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