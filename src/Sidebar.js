import React, { useState , useEffect, useContext} from 'react';
import SidebarChat from './SidebarChat';
import { Avatar, IconButton } from '@material-ui/core';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import db from './firebase';
import {StateContext } from './App';

const Sidebar = () => {
  const state = useContext(StateContext);

  const [input, setInput] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(()=>{  
    db.collection("rooms").onSnapshot((snapshot)=>{
      setRooms(snapshot.docs.map((doc)=>{
        return{
          id: doc.id,
          data:doc.data().name,
        }
      }))
    })
  }, []);

  return (
    <div className = "sidebar">
      <div className="sidebar__header">
        
        <Avatar src={`${state.details.photoURL}`}></Avatar>
        <div className="sidebar__header__right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon onClick = {()=>{
              
            }}/>
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="container">
          <SearchIcon />
          <input type="text" value = {input} onChange = {(e)=>{
            setInput(e.target.value);
          }}
          placeholder= "Search the Room"/>  
        </div>
      </div>  
      <div className="sidebar__chats">
        <SidebarChat addNewChat/>
        {rooms.map((room)=>{
          return (
            <SidebarChat id= {room.id} data={room.data} key={room.id}/>
          )
        })}
      </div>        
    </div>
  )
}

export default Sidebar;
