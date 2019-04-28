import React from "react";
import "./InformationWindow.scss";

const InformationWindow = props => {

  return (
    <div id="information-window">
      <div id="removed-lines">Lines: {props.removedLines}</div>
      <div id="levels">Level: {props.levels}</div>
      <button id="prevent-reset" style={{width:"0px", height: "0px", }}/>
      <button onClick={props.reset} >Reset</button>
    </div>
  );
};

export default InformationWindow;
