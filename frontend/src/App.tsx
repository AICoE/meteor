import React, { Component } from "react";
import { connect, sendMsg } from "./api";

const App = () => {

  const send = () => {
    console.log("hello");
    sendMsg("hello");
  }

  return (
    <div className="App">
      <button onClick={send}>Hit</button>
    </div>
  );
}

export default App;
