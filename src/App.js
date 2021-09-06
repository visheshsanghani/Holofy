import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Draggable  from "./Components/Draggable/Draggable";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Draggable} />
      </Switch>
    </Router>
  );
};

export default App;
