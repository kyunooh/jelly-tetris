import React from "react";
import "./PlayView.scss";
import Row from "./Row";
import GameOver from "./GameOver";

function PlayView(props) {
  const grid = props.grid;
  props.tickTimer(props.levels);

  document.onkeydown = e => {
    if (e.key === "ArrowLeft") {
      props.moveLeft();
    }

    if (e.key === "ArrowRight") {
      props.moveRight();
    }

    if (e.key === "ArrowDown") {
      props.tick();
    }

    if(e.key === "ArrowUp") {
      props.rotate();
    }

    if(e.key === " ") {
      props.drop();
    }

    if(e.key === "Shift") {
      props.hold();
    }
  };

  return <div>{props.gameOver ? <GameOver /> : <Row grid={grid} />}</div>;
}


export default PlayView;
