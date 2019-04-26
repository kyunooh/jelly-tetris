import React from 'react';

import './PlayView.scss';
import {connect} from "react-redux";
import GameOver from "./GameOver";



function PlayView(store) {
  const grid = store.grid.grid;

  setTimeout(() => {
    store.dispatch({
      type: "TICK"
    });
  }, 100);

  function column(row) {
    let view = [];
    for (let column = 0; column < grid[row].length; column++) {
      const keyName = `${row}-${column}`;
      if (grid[row][column]) {
        view.push(<span className="cell fill" key={keyName}>&nbsp;</span>)
      } else {
        view.push(<span className="cell empty" key={keyName}>&nbsp;</span>)
      }
    }
    return view;
  }

  function renderGrid() {
    let view = [];
    for (let row = 0; row < grid.length; row++) {
      view.push(<div className="row" key={row}>{column(row)}</div>);
    }
    return view;
  }

  return (
    <div>
      {store.gameOver ? <GameOver /> : renderGrid()}
    </div>
  )
}
const mapStateToProps = state => ({ grid: state.grid, gameOver: state.gameOver });


export default connect(mapStateToProps)(PlayView);