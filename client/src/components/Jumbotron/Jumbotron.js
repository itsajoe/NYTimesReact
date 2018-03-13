import React from "react";

const Jumbotron = ({ children }) =>
  <div style={{ height: 500, clear: 'both', textAlign: "center", backgroundColor: "blue" }} className="jumbotron">
    {children}
  </div>;

export default Jumbotron;
