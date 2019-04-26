import {createAction, handleActions} from 'redux-actions';

const TICK = "jelly-tetris/tick";
const MOVE_LEFT = "jelly-tetris/moveLeft";
const MOVE_RIGHT = "jelly-tetris/moveRight";

export const tick = createAction(TICK);
export const moveLeft = createAction(MOVE_LEFT);
export const moveRight = createAction(MOVE_RIGHT);


const initialState = {
  newBlock: true,
  gameOver: false,
  // When in production
  // Array(16).fill(Array(10).fill(0))
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
  ]
};

const tetriminos = [
  [[2, 2, 2, 2]],
  [[2, 2, 2], [0, 0, 2]],
  [[2, 2, 2], [2, 0, 0]],
  [[2, 2], [2, 2]],
  [[2, 2, 2], [0, 2, 0]]
];

const padding = 3;

const createNewBlock = (grid, state) => {
  const r = Math.floor(Math.random() * 5);
  const block = tetriminos[r];
  for (let row = 0; row < block.length; row++) {
    for (let column = 0; column < block[row].length; column++) {
      if (grid[row][column + padding]) state.gameOver = true;
      grid[row][column + padding] = block[row][column];
    }
  }
};

const copyGrid = grid =>
  grid.map(arr => {
    return arr.slice();
  });

function isEndTick(row, state, newGrid, column) {
  return row === state.grid.length - 1 || newGrid[row + 1][column] === 1;
}

export default handleActions({
  [TICK]: state => doTick(state),
  [MOVE_LEFT]: state => doMoveLeft(state),
  [MOVE_RIGHT]: state => doMoveRight(state)
}, initialState);


const doTick = state => {
  let newGrid = copyGrid(state.grid);
  if (state.newBlock) {
    createNewBlock(newGrid, state);
    state.newBlock = false;
    state.grid = newGrid;
    return {...state};
  }
  for (let row = newGrid.length - 1; row >= 0; row--) {
    for (let column = 0; column < newGrid[row].length; column++) {
      if (newGrid[row][column] === 2) {
        if (isEndTick(row, state, newGrid, column)) {
          newGrid = copyGrid(state.grid);
          state.newBlock = true;
          // Remove Filled Block
          for (let r = 0; r < newGrid.length; r++) {
            const row = newGrid[r];
            let filled = true;
            for (let c = 0; c < row.length; c++) {
              if (row[c]) row[c] = 1;
              if (!row[c]) filled = false;
              if (filled && c === row.length - 1) {
                newGrid.splice(r, 1);
                newGrid.unshift(Array(10).fill(0));
              }
            }
          }
          state.grid = newGrid;
          return doTick(state);
        }
        newGrid[row + 1][column] = 2;
        newGrid[row][column] = 0;
      }
    }
  }
  state.grid = newGrid;
  return {...state};
};

const cellIsCurrentBlock = cell => {
  return cell === 2;
};

const doMoveLeft = state => {
  const newGrid = copyGrid(state.grid);
  let needChange = true;
  for (let r = newGrid.length - 1; r >= 0; r--) {
    const row = newGrid[r];
    for (let c = 0; c < row.length; c++) {
      if (cellIsCurrentBlock(row[c])) {
        if (row[c - 1] === 0) {
          newGrid[r][c - 1] = 2;
          newGrid[r][c] = 0;
        } else {
          needChange = false;
        }
      }
    }
  }

  if (needChange) state.grid = newGrid;
  return {...state};
};

const doMoveRight = state => {
  const newGrid = copyGrid(state.grid);
  let needChange = true;

  for (let r = newGrid.length - 1; r >= 0; r--) {
    const row = newGrid[r];
    for (let c = row.length - 1; c >= 0; c--) {
      if (cellIsCurrentBlock(row[c])) {
        if (row[c + 1] === 0) {
          newGrid[r][c] = 0;
          newGrid[r][c + 1] = 2;
        } else {
          needChange = false;
        }
      }
    }
  }

  if (needChange) state.grid = newGrid;
  return {...state};
};