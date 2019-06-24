import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import Create from './containers/Create';
import Diploma from './containers/Diploma';
import Transcript from './containers/Transcript';
import UnsignedList from './containers/UnsignedList';
import Information from './containers/Information';
import Error from './containers/Error';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/create" component={Create}/>
        <Route path="/create_diploma" component={Diploma}/>
        <Route path="/create_transcript" component={Transcript}/>
        <Route path="/unsigned" component={UnsignedList}/>
        <Route path="/info" component={Information}/>
        <Route component={Error}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
