import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/css/style.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Home} path="/" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
