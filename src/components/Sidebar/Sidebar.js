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
// import InsertCommentIcon from "@material-ui/icons/InsertComment";
// import ClearIcon from '@mui/icons-material/Clear';
// import LoopIcon from "@material-ui/icons/Loop";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { SelectWorkspace } from "./Workspace/selectWorkspace";
import { CreateWorkspace } from "./Workspace/createWorkspace";

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();

  const [showChannels, setShowChannels] = useState(false);
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
            <h2>Workflow name</h2>
         
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
          <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
          {/* <SidebarOption Icon={FileCopyIcon} title="File browser" /> */}
          <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
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
              setShowChannels(true)
            }} 
          >
            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
          </div>
      )}
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />

      {/* Connect to db and list all the channels*/}
      {/* SidebarOptionn */}
      {showChannels && channels.map((channel) => (
        <SidebarOption title={channel.name} id={channel.id} />
      ))}
    </div>
  );
}

export default Sidebar;
