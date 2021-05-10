import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom'
import Call from './pages/Call';
import Login from './pages/Login';
import Maps from './pages/Maps';
import Notfound from './pages/Notfound';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/maps" exact component={Maps} />
        <Route path="/call" exact component={Call} />
        <Route component={Notfound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
