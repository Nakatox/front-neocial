import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom'
import Room from './pages/Room';
import CreateRoom from './pages/CreateRoom';
import Login from './pages/Login';
import Maps from './pages/Maps';
import Notfound from './pages/Notfound';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/maps" exact component={Maps} />
        <Route path="/room" exact component={CreateRoom} />
        <Route path="/room/:roomID" component={Room} />
        <Route component={Notfound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
