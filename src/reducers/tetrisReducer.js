import { createAction, handleActions } from "redux-actions";

const TICK = "jelly-tetris/tick";
const MOVE_LEFT = "jelly-tetris/moveLeft";
const MOVE_RIGHT = "jelly-tetris/moveRight";
const ROTATE = "jelly-tetris/rotate";

export const tick = createAction(TICK);
export const moveLeft = createAction(MOVE_LEFT);
export const moveRight = createAction(MOVE_RIGHT);
export const rotate = createAction(ROTATE);

const initialState = {
  newBlock: true,
  gameOver: false,
  currentBlock: [],
  currentBlockLocation: [0, 0],
  grid: Array(16).fill(Array(10).fill(0))
};

// I J L O T
const tetriminos = {
  0: [[2, 2, 2, 2]],
  1: [[2, 2, 2], [0, 0, 2]],
  2: [[2, 2, 2], [2, 0, 0]],
  3: [[2, 2], [2, 2]],
  4: [[2, 2, 2], [0, 2, 0]]
};

const setCurrentLocation = state => {
  let find = false;
  for (let r = 0; r < state.grid.length; r++) {
    for (let c = 0; c < state.grid[r].length; c++) {
      if (state.grid[r][c] === 2) {
        state.currentBlockLocation = [r, c];
        find = true;
        break;
      }
    }
    if (find) break;
  }
};


function canNotRotate(newGrid, r, cr, c, cc) {
  return newGrid[r + cr] === undefined || newGrid[r + cr][c + cc] || newGrid[r + cr][c + cc];
}

const initCurrentBlock = (state, rotatedTetrimino) => {
  const newGrid = copyGrid(state.grid);
  for (let r = 0; r < newGrid.length; r++) {
    for (let c = 0; c < newGrid[r].length; c++) {
      if (newGrid[r][c] === 2) {
        newGrid[r][c] = 0;
      }
    }
  }

  // current coordinate
  const cr = state.currentBlockLocation[0];
  const cc = state.currentBlockLocation[1];
  for(let r = 0; r < rotatedTetrimino.length; r++) {
    for (let c = 0; c < rotatedTetrimino[r].length; c++) {
      if (canNotRotate(newGrid, r, cr, c, cc)) {
        return;
      }
      newGrid[r + cr][c + cc] = rotatedTetrimino[r][c];
    }
  }
  state.currentBlock = rotatedTetrimino;
  state.grid = [...newGrid];
};

const doRotate = state => {
  const rotatedTetrimino = [];
  const w = state.currentBlock.length;
  const h = state.currentBlock[0].length;
  const tetrimino = state.currentBlock;

  for (let i = 0; i < h; i++) {
    const row = [];
    for (let j = 0; j < w; j++) {
      row.push(tetrimino[w - (w - j - 1) - 1][h - i - 1]);
    }
    rotatedTetrimino.push(row);
  }
  initCurrentBlock(state, rotatedTetrimino);
  return {...state};
};

const padding = 3;

const createNewBlock = (grid, state) => {
  const r = Math.floor(Math.random() * 5);
  const block = tetriminos[r];
  state.currentBlock = block;
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

export default handleActions(
  {
    [TICK]: state => doTick(state),
    [MOVE_LEFT]: state => doMoveLeft(state),
    [MOVE_RIGHT]: state => doMoveRight(state),
    [ROTATE]: state => doRotate(state)
  },
  initialState
);

const doTick = state => {
  let newGrid = copyGrid(state.grid);
  if (state.newBlock) {
    createNewBlock(newGrid, state);
    state.newBlock = false;
    state.grid = newGrid;
    setCurrentLocation(state);
    return { ...state };
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
        // TODO Rotate
      }
    }
  }

  state.grid = newGrid;
  setCurrentLocation(state);
  return { ...state };
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
  setCurrentLocation(state);
  return { ...state };
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
  setCurrentLocation(state);
  return { ...state };
};
