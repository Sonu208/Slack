import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption/SidebarOption";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
// import InsertCommentIcon from "@material-ui/icons/InsertComment";
// import ClearIcon from '@mui/icons-material/Clear';
// import LoopIcon from "@material-ui/icons/Loop";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { SelectWorkspace } from "./Workspace/selectWorkspace";
import { CreateWorkspace } from "./Workspace/createWorkspace";
import axios from 'axios';


function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();
  const [workspace,setWorkspace] = useState([]);
  const [showChannels, setShowChannels] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [showmore, setShowmore] = useState(false);
  const [selectWorkspace, setSelectWorkspace] = useState(false);
  const [createWorkspace, setCreateWorkspace] = useState(false);
  

  const handleSelectWorkspace = (bool) => {
    setSelectWorkspace(bool);
  };

  const handleCreateWorkspace = (bool) => {
    setCreateWorkspace(bool);
  };
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
                setWorkspace(res.data);
                // setcreateworkspace(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } 
    , [])

  useEffect(() => {

    axios({
      method: 'get',
      url: 'https://slack-clone2022.herokuapp.com/user/',

      data: {
        
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
          
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    db.collection("rooms").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="siderbar-header">
        <div className="sidebar-info">
          <div>
            {workspace[0]?(
              <h2>{workspace[0].name}</h2>
            ):(

              <h2>Workflow name</h2>
            )}
         
          </div>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        {selectWorkspace && <SelectWorkspace setselectworkspace={handleSelectWorkspace} setcreateworkspace={handleCreateWorkspace}/>}
        {createWorkspace && <CreateWorkspace setselectworkspace={handleSelectWorkspace} setcreateworkspace={handleCreateWorkspace}/>}
        <Button onClick={()=>{
          setSelectWorkspace(true);
        }}>
          <CreateIcon />
        </Button>
      </div>
      {showmore ? (
        <div> 
          <SidebarOption Icon={InboxIcon} title="Metions & reactions" />
          <div
            onClick={()=>{
              setShowmore(false)
            }} 
          >
            <SidebarOption Icon={ExpandMoreIcon} title="Show mess" />
          </div>
        </div>
      ) : (
        <div>
          {/* <SidebarOption Icon={InsertCommentIcon} title="Threads" /> */}
          <SidebarOption Icon={InboxIcon} title="Metions & reactions" />
          {/* <SidebarOption Icon={DraftsIcon} title="Saved items" /> */}
          {/* <SidebarOption Icon={ChatIcon} title="Chats" /> */}
          {/* <SidebarOption Icon={FileCopyIcon} title="File browser" /> */}
          <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
          <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
          <SidebarOption Icon={AddIcon} addChannelOption title="Add Chat" />
          {/* <SidebarOption Icon={AppsIcon} title="Apps" /> */}
          <div
            onClick={()=>{
              setShowmore(true)
            }} 
          >
            <SidebarOption Icon={ExpandLessIcon} title="Show less" />
          </div>
        </div>

      )}
      
      <hr />
      {showChannels ? (
        <div
        onClick={()=>{
          setShowChannels(false)
        }} 
      >
        <SidebarOption Icon={ExpandLessIcon} title="Channels" />
      </div>
      ):(
        <div
            onClick={()=>{
              setShowChannels(true);
              setShowChats(false);
              
            }} 
          >
            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
          </div>
      )}
      <hr />
      {showChats ? (
        <div
        onClick={()=>{
          setShowChats(false)
        }} 
      >
        <SidebarOption Icon={ExpandLessIcon} title="Chats" />
      </div>
      ):(
        <div
            onClick={()=>{
              setShowChats(true);
              setShowChannels(false);
            }} 
          >
            <SidebarOption Icon={ExpandMoreIcon} title="Chats" />
          </div>
      )}
      <hr />
      

      {/* Connect to db and list all the channels*/}
      {/* SidebarOptionn */}
      {showChannels && channels.map((channel) => (
        <SidebarOption title={channel.name} id={channel.id} />
      ))}

      {/* {showChats && channels.map((channel) => (
        <SidebarOption title={channel.name} id={channel.id} />
      ))} */}
    </div>
  );
}

export default Sidebar;
