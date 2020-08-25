import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PointOfSale from "./PointOfSale";
import Checkout from "./Checkout";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/checkout' exact component={Checkout} />
        <Route path='/' exact component={PointOfSale} />
      </Switch>
    </Router>
  );
};

export default App;
