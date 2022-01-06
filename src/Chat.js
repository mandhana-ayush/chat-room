import React, { useContext, useEffect, useRef, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { StateContext } from "./App";

import firebase from "firebase/compat/app";

const Chat = () => {
  const state = useContext(StateContext);

  // const [textInput, setTextInput] = useState("");
  const inputContainer = useRef(null);
  const avatarRef = useRef(null);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          // console.log(snapshot.data())
          setRoomName(snapshot.data().name);
          avatarRef.current = snapshot.data().avatar;

        });
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    db.collection("rooms").doc(roomId).collection("messages").add({
      name: state.details.displayName,
      message:inputContainer.current.value,
      nameId: state.details.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    inputContainer.current.value = "";
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header__info">
          <Avatar
            src={avatarRef.current}
          />
          <div>
            <h2>{roomName}</h2>
            <p>
              {
                messages[messages.length-1]? "Last Seen at " + new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toLocaleString() : "Please type the First Message"
              }
            </p>
          </div>
        </div>

        <div className="chat__header__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => {
          return (
            <p
              className={
                message.nameId === state.details.uid
                  ? "chat__receiver"
                  : "chat__message"
              }
            >
              <span className="chat__heading">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toLocaleString()}
              </span>
            </p>
          );
        })}
      </div>

      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <form>
          <input
            type="text"
            ref = {inputContainer}
            placeholder="Type a message"
          />
          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
