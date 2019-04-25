import React from 'react';
import './PlayView.scss';
import {connect} from "react-redux";
import Row from "./Row";



function PlayView(store) {
  const grid = store.grid.grid;

  const tick = setTimeout(() => {
    store.dispatch({
      type: "TICK"
    });
  }, 1000);

  document.onkeydown = (e) => {
    clearTimeout(tick);
    if (e.key === "ArrowLeft") {
      store.dispatch({
        type: "MOVE_LEFT"
      });
    }

    if (e.key === "ArrowRight") {
      store.dispatch({
        type: "MOVE_RIGHT"
      });
    }

    if (e.key === "ArrowDown") {
      store.dispatch({
        type: "TICK"
      });
    }
  };

  return (
    <div>
      <Row grid={grid} />
    </div>
  )
}
const mapStateToProps = state => ({ grid: state.grid });



export default connect(mapStateToProps)(PlayView);