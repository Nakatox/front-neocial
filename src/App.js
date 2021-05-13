import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom'
import Call from './pages/Call';
import CreateCall from './pages/CreateCall';
import Login from './pages/Login';
import Maps from './pages/Maps';
import Notfound from './pages/Notfound';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/maps" exact component={Maps} />
        <Route path="/call" exact component={CreateCall} />
        <Route path="/call/:roomID" exact component={Call} />
        <Route component={Notfound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
