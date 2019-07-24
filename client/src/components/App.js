import React from "react";
import Header from "./Header";
import { Route } from "react-router-dom";
import Create from "./streams/Create";

const App = () => {
  return (
    <div>
      <Header />
      <Route path="/streams/new" component={Create} />
    </div>
  );
};

export default App;
