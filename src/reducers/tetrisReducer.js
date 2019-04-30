import { createAction, handleActions } from "redux-actions";

const JELLY_TETRIS = "jelly-tetris";
const initialState = () => {
  const existTetris = localStorage.getItem(JELLY_TETRIS);
  if (existTetris) {
    return JSON.parse(existTetris);
  }
  return {
    newBlock: true,
    gameOver: false,
    dropping: false,
    hold: false,
    canHold: true,
    removedLines: 0,
    levels: 1,
    currentBlock: [],
    currentBlockNumber: -1,
    nextBlock: [],
    nextBlockNumber: -1,
    holdBlock: [],
    temporaryHoldBlockNumber: 0,
    currentBlockLocation: [0, 0],
    grid: Array(16).fill(Array(10).fill(0))
  };
};

const doReset = state => {
  clearInterval(state.reservedTick);
  localStorage.setItem(JELLY_TETRIS, "");
  return initialState();
};

const setCurrentLocation = state => {
  let findLeftUpper = false;
  for (let r = 0; r < state.grid.length; r++) {
    for (let c = 0; c < state.grid[r].length; c++) {
      if (state.grid[r][c] > 10) {
        state.currentBlockLocation = [r, c];
        findLeftUpper = true;
        break;
      }
    }
    if (findLeftUpper) break;
  }
};

function canNotRotate(newGrid, r, cr, c, cc) {
  return (
    r + cr >= newGrid.length ||
    c + cc >= newGrid[0].length ||
    newGrid[r + cr][c + cc]
  );
}

const rotateBlock = (state, rotatedTetrimino, cStep = 0, rStep = 0) => {
  if (cStep < -3) {
    if (rStep > 2) {
      return;
    }
    rotateBlock(state, rotatedTetrimino, -1, rStep + 1);
    return;
  }
  if (rStep > 2) {
    if (cStep > 0) {
      rotateBlock(state, rotatedTetrimino, -1);
    }
    return;
  }
  if (cStep > 3) {
    rotateBlock(state, rotatedTetrimino, 0, rStep + 1);
    return;
  }

  const newGrid = copyGrid(state.grid);
  for (let r = 0; r < newGrid.length; r++) {
    for (let c = 0; c < newGrid[r].length; c++) {
      if (newGrid[r][c] > 10) {
        newGrid[r][c] = 0;
      }
    }
  }
  // current coordinate
  const cr = state.currentBlockLocation[0] + rStep;
  const cc = state.currentBlockLocation[1] + cStep;
  for (let r = 0; r < rotatedTetrimino.length; r++) {
    for (let c = 0; c < rotatedTetrimino[r].length; c++) {
      if (canNotRotate(newGrid, r, cr, c, cc)) {
        if (cStep >= 0) rotateBlock(state, rotatedTetrimino, cStep + 1, rStep);
        else rotateBlock(state, rotatedTetrimino, cStep - 1, rStep);
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
  rotateBlock(state, rotatedTetrimino);
  return { ...state };
};

const padding = 3;

// I J L O T Z S
const tetriminos = {
  0: [[11, 11, 11, 11]],
  1: [[12, 12, 12], [0, 0, 12]],
  2: [[13, 13, 13], [13, 0, 0]],
  3: [[14, 14], [14, 14]],
  4: [[15, 15, 15], [0, 15, 0]],
  5: [[16, 16, 0], [0, 16, 16]],
  6: [[0, 17, 17], [17, 17, 0]]
};

const createNewBlock = (grid, state) => {
  if (state.currentBlock.length === 0) {
    state.currentBlockNumber = Math.floor(Math.random() * 7);
    state.currentBlock = [...tetriminos[state.currentBlockNumber]];
    state.nextBlockNumber = Math.floor(Math.random() * 7);
    state.nextBlock = [...tetriminos[state.nextBlockNumber]];
  } else if (state.hold && state.holdBlock.length > 0) {
    state.temporaryHoldBlockNumber = state.currentBlockNumber;
    state.currentBlock = [...state.holdBlock];
  } else if (state.hold) {
    state.temporaryHoldBlockNumber = state.currentBlockNumber;
  } else {
    state.currentBlock = [...state.nextBlock];
    state.currentBlockNumber = state.nextBlockNumber;
    state.nextBlockNumber = Math.floor(Math.random() * 7);
    const block = tetriminos[state.nextBlockNumber];
    state.nextBlock = [...block];

  }

  for (let row = 0; row < state.currentBlock.length; row++) {
    for (let column = 0; column < state.currentBlock[row].length; column++) {
      if (grid[row][column + padding] > 0 && grid[row][column + padding] < 10)
        state.gameOver = true;
      grid[row][column + padding] = state.currentBlock[row][column];
    }
  }
};

const copyGrid = grid =>
  grid.map(arr => {
    return arr.slice();
  });

function isEndTick(row, state, newGrid, column) {
  return (
    row === state.grid.length - 1 ||
    (newGrid[row + 1][column] < 10 && newGrid[row + 1][column] > 0)
  );
}

const doDrop = state => {
  state.dropping = true;
  while (state.dropping) {
    state = doTick(state);
  }
  return { ...state };
};

const doTick = state => {
  localStorage.setItem(JELLY_TETRIS, JSON.stringify(state));
  let newGrid = copyGrid(state.grid);
  if (state.newBlock) {
    createNewBlock(newGrid, state);
    state.newBlock = false;
    state.dropping = false;
    if(!state.hold) state.canHold = true;
    state.hold = false;
    state.grid = newGrid;
    setCurrentLocation(state);
    return { ...state };
  }
  for (let row = newGrid.length - 1; row >= 0; row--) {
    for (let column = 0; column < newGrid[row].length; column++) {
      if (newGrid[row][column] > 10) {
        if (isEndTick(row, state, newGrid, column)) {
          newGrid = copyGrid(state.grid);
          state.newBlock = true;
          // Remove Filled Block
          for (let r = 0; r < newGrid.length; r++) {
            const row = newGrid[r];
            let filled = true;
            for (let c = 0; c < row.length; c++) {
              if (row[c] && row[c] > 10) row[c] -= 10;
              if (!row[c]) filled = false;
              if (filled && c === row.length - 1) {
                removeLines(newGrid, r, state);
              }
            }
          }
          state.grid = newGrid;
          return doTick(state);
        }
        newGrid[row + 1][column] = newGrid[row][column];
        newGrid[row][column] = 0;
      }
    }
  }

  state.grid = newGrid;
  setCurrentLocation(state);
  return { ...state };
};

const removeLines = (grid, row, state) => {
  grid.splice(row, 1);
  grid.unshift(Array(10).fill(0));
  state.removedLines += 1;
  if (state.removedLines % 8 === 0) {
    clearInterval(state.reservedTick);
    state.levels += 1;
    state.reservedTick = setInterval(() => {
      tick();
    }, 1000 * Math.pow(0.85, state.levels));
  }
};

const cellIsCurrentBlock = cell => {
  return cell > 10;
};

const doMoveLeft = state => {
  const newGrid = copyGrid(state.grid);
  let needChange = true;
  for (let r = newGrid.length - 1; r >= 0; r--) {
    const row = newGrid[r];
    for (let c = 0; c < row.length; c++) {
      if (cellIsCurrentBlock(row[c])) {
        if (row[c - 1] === 0) {
          newGrid[r][c - 1] = newGrid[r][c];
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
          const originValue = newGrid[r][c];
          newGrid[r][c] = 0;
          newGrid[r][c + 1] = originValue;
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

const doHold = (state) => {
  if(!state.canHold) return {...state};
  state.canHold = false;
  state.hold = true;
  for(let r = 0; r < state.grid.length; r++) {
    for (let c = 0; c < state.grid[r].length; c++) {
      if(state.grid[r][c] > 10) state.grid[r][c] = 0;
    }
  }

  state.newBlock = true;
  state = doTick(state);
  state.holdBlock = tetriminos[state.temporaryHoldBlockNumber];
  return state;
};


const TICK = "jelly-tetris/tick";
const MOVE_LEFT = "jelly-tetris/moveLeft";
const MOVE_RIGHT = "jelly-tetris/moveRight";
const ROTATE = "jelly-tetris/rotate";
const DROP = "jelly-tetris/drop";
const RESET = "jelly-tetris/reset";
const HOLD = "jelly-tetris/hold";

export const tick = createAction(TICK);
export const moveLeft = createAction(MOVE_LEFT);
export const moveRight = createAction(MOVE_RIGHT);
export const rotate = createAction(ROTATE);
export const drop = createAction(DROP);
export const reset = createAction(RESET);
export const hold = createAction(HOLD);

export default handleActions(
  {
    [TICK]: state => doTick(state),
    [MOVE_LEFT]: state => doMoveLeft(state),
    [MOVE_RIGHT]: state => doMoveRight(state),
    [ROTATE]: state => doRotate(state),
    [DROP]: state => doDrop(state),
    [RESET]: state => doReset(state),
    [HOLD]: state => doHold(state)
  },
  initialState()
);
