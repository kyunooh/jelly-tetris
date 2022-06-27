import {copyGrid, doTick, setCurrentLocation, tetriminos} from "./gridOperations";

const whoosh = new Audio("https://kyunooh.github.io/jelly-tetris/whoosh.wav");

const cellIsCurrentBlock = cell => {
  return cell > 10;
};

function canNotRotate(newGrid, r, cr, c, cc) {
  return (
    r + cr >= newGrid.length ||
    c + cc >= newGrid[0].length ||
    newGrid[r + cr][c + cc]
  );
}

const rotateBlock = (state, rotatedTetrimino, cStep = 0, rStep = 0) => {
  let newState = {...state};
  if (cStep < -4) {
    if (rStep > 2) {
      return;
    }
    rotateBlock(newState, rotatedTetrimino, -1, rStep + 1);
    return newState;
  }
  if (rStep > 2) {
    if (cStep > 0) {
      rotateBlock(newState, rotatedTetrimino, -1);
    }
    return newState;
  }
  if (cStep > 3) {
    rotateBlock(newState, rotatedTetrimino, 0, rStep + 1);
    return newState;
  }

  const newGrid = copyGrid(newState.grid);
  for (let r = 0; r < newGrid.length; r++) {
    for (let c = 0; c < newGrid[r].length; c++) {
      if (newGrid[r][c] > 10) {
        newGrid[r][c] = 0;
      }
    }
  }
  // current coordinate
  const cr = newState.currentBlockLocation[0] + rStep;
  const cc = newState.currentBlockLocation[1] + cStep;
  for (let r = 0; r < rotatedTetrimino.length; r++) {
    for (let c = 0; c < rotatedTetrimino[r].length; c++) {
      if (canNotRotate(newGrid, r, cr, c, cc)) {
        if (cStep >= 0)
          rotateBlock(newState, rotatedTetrimino, cStep + 1, rStep);
        else rotateBlock(newState, rotatedTetrimino, cStep - 1, rStep);
        return newState;
      }
      newGrid[r + cr][c + cc] = rotatedTetrimino[r][c];
    }
  }
  newState.currentBlock = rotatedTetrimino;
  newState.grid = [...newGrid];
  return newState;
};
export const doRotate = state => {
  let newState = {...state};
  whoosh.play();
  const rotatedTetrimino = [];
  const w = newState.currentBlock.length;
  const h = newState.currentBlock[0].length;
  const tetrimino = newState.currentBlock;

  for (let i = 0; i < h; i++) {
    const row = [];
    for (let j = 0; j < w; j++) {
      row.push(tetrimino[w - (w - j - 1) - 1][h - i - 1]);
    }
    rotatedTetrimino.push(row);
  }
  return rotateBlock(newState, rotatedTetrimino);
};
export const doDrop = state => {
  let newState = {...state};
  newState.dropping = true;
  while (newState.dropping) {
    newState = doTick(newState);
  }

  return newState;
};
export const doMoveLeft = state => {
  let newState = {...state};
  const newGrid = copyGrid(newState.grid);
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

  if (needChange) newState.grid = newGrid;
  return setCurrentLocation(newState);
};
export const doMoveRight = state => {
  let newState = {...state};
  const newGrid = copyGrid(newState.grid);
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

  if (needChange) newState.grid = newGrid;
  newState = setCurrentLocation(newState);
  return {...newState};
};
export const doHold = state => {
  let newState = {...state};

  if (!newState.canHold) return {...newState};
  newState.canHold = false;
  newState.hold = true;
  for (let r = 0; r < newState.grid.length; r++) {
    for (let c = 0; c < newState.grid[r].length; c++) {
      if (newState.grid[r][c] > 10) newState.grid[r][c] = 0;
    }
  }

  newState.newBlock = true;
  newState = doTick(newState);
  newState.holdBlock = tetriminos[newState.temporaryHoldBlockNumber];
  return newState;
};
