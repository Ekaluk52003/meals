import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./routes/Home";
import Layout from "./routes/Layout";

function App() {
  return (
    <div className='pt-6 pb-6 bg-gray-100'>
      <Router>
        <div class='px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto font-body2'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/layout' component={Layout} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
