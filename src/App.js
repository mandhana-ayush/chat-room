import './App.css';
import React from 'react';
import { useState , useReducer} from 'react';

import Sidebar from './Sidebar';
import Chat from './Chat';
import Newchat from './Newchat';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './Login';

import { initialState, reducer} from './reducer';

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
  return (
    <StateContext.Provider value = {state}>
    <DispatchContext.Provider value = {dispatch}>
      <div className="app">
      {isUserLoggedIn?
        (<div className="app__container">
          <Router>
          <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>
              <Route path = "/">
                <Newchat />
              </Route>
            </Switch>
          </Router>
        </div>):
        <Login setMethod = {setIsUserLoggedIn} />
        }
      </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
    )
  }
export default App;
