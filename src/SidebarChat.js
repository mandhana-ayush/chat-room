import React, {useEffect, useRef, useState } from "react";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";
// import { DispatchContext } from "./App";
const SidebarChat = ({ id, data, addNewChat }) => {
  const [msg, setMsg] = useState([]);

  const avatarRef = useRef(null);
  // const dispatch = useContext(DispatchContext);

  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMsg(snapshot.docs.map((doc) => doc.data()));
      });
  }, [id]);

  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .onSnapshot((snapshot) => {
        if (id) {
          avatarRef.current = snapshot.data().avatar;

          // dispatch({
          //   type:"avatar_value",
          //   payload:avatarRef.current,
          // })
        }
      });
  }, [id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <div className="sidebarChat__left">
          <Avatar
            src={avatarRef.current}
          />
        </div>
        <div className="sidebarChat__right">
          <h2>{data}</h2>
          <p>Last Message - {msg[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div
      className="sidebarChat"
      onClick={() => {
        let roomName = prompt("Enter the Room Name ");
        if (roomName) {
          db.collection("rooms").add({
            name: roomName,
            avatar: `https://avatars.dicebear.com/api/human/${
              Math.random() * 5000
            }.svg`,
          });
        }
      }}
    >
      <h3>Add New Room</h3>
    </div>
  );
};
export default SidebarChat;
