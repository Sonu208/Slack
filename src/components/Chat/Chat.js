import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import StarBorderOutlineIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import db from "../../firebase";
import Message from "../Message/Message";
import ChatInput from "./ChatInput/ChatInput";
import CloseIcon from '@mui/icons-material/Close';

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  console.log(roomDetails);
  console.log("MESSAGES", roomMessages);

  return (
    <div className="chat">
      {openDetails ? (
        <div className="chat__details">
          <div className="chat__detailsHeader">
            <h3>Details</h3>
            <span className="close-btn" onClick={()=>{
                         
                setOpenDetails(false);
            }}><CloseIcon/></span>
            {/* <button onClick={() => setOpenDetails(false)}>X</button> */}
          </div>
          <div className="chat__detailsBody">
            <p>Created by: {roomDetails?.createdBy}</p>
            <p>Created at: {roomDetails?.createdAt}</p>
            <p>Room name: {roomDetails?.name}</p>
            <p>Room description:</p>
          </div>
        </div>
      ):(

        <div>

            <div className="chat-header">
              <div className="chat-headerLeft">
                <h4 className="chat-channelName">
                  <strong>#{roomDetails?.name}</strong>
                  {/* <StarBorderOutlineIcon /> */}
                </h4>
              </div>
              <div className="chat-headerRight">
                <p style={{ cursor:'pointer'}} onClick={()=>{setOpenDetails(true)}}>
                  <InfoOutlinedIcon /> Details
                </p>
              </div>
            </div>
            <div className="chat-messages">
              {roomMessages.map(({ message, timestamp, user, userImage }) => (
                <Message
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                  key={timestamp}
                />
              ))}
            </div>
            <ChatInput channelName={roomDetails?.name} channelId={roomId} />
        </div>
      )}
    </div>
  );
}

export default Chat;
