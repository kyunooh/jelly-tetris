import {JELLY_TETRIS} from "../../reducers/tetrisReducer";

const kick = new Audio("http://jellyms.kr/jelly-tetris/kick.wav");

const PADDING = 3;
// I J L O T Z S
export const tetriminos = {
  0: [[11, 11, 11, 11]],
  1: [[12, 12, 12], [0, 0, 12]],
  2: [[13, 13, 13], [13, 0, 0]],
  3: [[14, 14], [14, 14]],
  4: [[15, 15, 15], [0, 15, 0]],
  5: [[16, 16, 0], [0, 16, 16]],
  6: [[0, 17, 17], [17, 17, 0]]
};

export const setCurrentLocation = (state) => {
  const newState = { ...state };
  let findLeftUpper = false;
  for (let r = 0; r < newState.grid.length; r++) {
    for (let c = 0; c < newState.grid[r].length; c++) {
      if (newState.grid[r][c] > 10) {
        newState.currentBlockLocation = [r, c];
        findLeftUpper = true;
        break;
      }
    }
    if (findLeftUpper) break;
  }
  return newState;
}

export const copyGrid = grid =>
  grid.map(arr => {
    return arr.slice();
  });

function isEndTick(row, state, newGrid, column) {
  return (
    row === state.grid.length - 1 ||
    (newGrid[row + 1][column] < 10 && newGrid[row + 1][column] > 0)
  );
}

export const doTick = state => {
  let newState = { ...state };
  localStorage.setItem(JELLY_TETRIS, JSON.stringify(newState));
  let newGrid = copyGrid(newState.grid);
  if (newState.newBlock) {
    newState = createNewBlock(newGrid, newState);
    newState.newBlock = false;
    newState.dropping = false;
    if (!newState.hold) newState.canHold = true;
    newState.hold = false;
    newState.grid = newGrid;

    newState = setCurrentLocation(newState);
    return newState;
  }
  for (let row = newGrid.length - 1; row >= 0; row--) {
    for (let column = 0; column < newGrid[row].length; column++) {
      if (newGrid[row][column] > 10) {
        if (isEndTick(row, newState, newGrid, column)) {
          if (!newState.gameOver) kick.play();
          newGrid = copyGrid(newState.grid);
          newState.newBlock = true;
          // Remove Filled Block
          for (let r = 0; r < newGrid.length; r++) {
            const row = newGrid[r];
            let filled = true;
            for (let c = 0; c < row.length; c++) {
              if (row[c] && row[c] > 10) row[c] -= 10;
              if (!row[c]) filled = false;
              if (filled && c === row.length - 1) {
                removeLines(newGrid, r, newState);
              }
            }
          }
          newState.grid = newGrid;
          return doTick(newState);
        }
        newGrid[row + 1][column] = newGrid[row][column];
        newGrid[row][column] = 0;
      }
    }
  }
  newState.grid = newGrid;
  return setCurrentLocation(newState);

  function removeLines(grid, row, state) {
    grid.splice(row, 1);
    grid.unshift(Array(10).fill(0));
    state.removedLines += 1;
    if (state.removedLines % 8 === 0) {
      state.levels += 1;
    }
  }

  function createNewBlock(grid, state) {
    let newState = { ...state };

    if (newState.currentBlock.length === 0) {
      newState.currentBlockNumber = Math.floor(Math.random() * 7);
      newState.currentBlock = [...tetriminos[newState.currentBlockNumber]];
      newState.nextBlockNumber = Math.floor(Math.random() * 7);
      newState.nextBlock = [...tetriminos[newState.nextBlockNumber]];
    } else if (newState.hold && newState.holdBlock.length > 0) {
      newState.temporaryHoldBlockNumber = newState.currentBlockNumber;
      newState.currentBlock = [...newState.holdBlock];
    } else if (newState.hold) {
      newState.temporaryHoldBlockNumber = newState.currentBlockNumber;
      newState.currentBlock = [...newState.nextBlock];
      newState.currentBlockNumber = newState.nextBlockNumber;
      newState.nextBlockNumber = Math.floor(Math.random() * 7);
      const block = tetriminos[newState.nextBlockNumber];
      newState.nextBlock = [...block];
    } else {
      newState.currentBlock = [...newState.nextBlock];
      newState.currentBlockNumber = newState.nextBlockNumber;
      newState.nextBlockNumber = Math.floor(Math.random() * 7);
      const block = tetriminos[newState.nextBlockNumber];
      newState.nextBlock = [...block];
    }

    for (let row = 0; row < newState.currentBlock.length; row++) {
      for (
        let column = 0;
        column < newState.currentBlock[row].length;
        column++
      ) {
        if (grid[row][column + PADDING] > 0 && grid[row][column + PADDING] < 10)
          newState.gameOver = true;
        grid[row][column + PADDING] = newState.currentBlock[row][column];
      }
    }
    return newState;
  }
};


