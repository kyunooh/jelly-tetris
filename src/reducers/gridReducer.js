const initialState = {
  newBlock: true,
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
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]]
};


const tetriminos = [
  [[2, 2, 2, 2]],
  [[2, 2, 2],
    [0, 0, 2]],
  [[2, 2, 2],
    [2, 0, 0]],
  [[2, 2],
    [2, 2]],
  [[2, 2, 2],
    [0, 2, 0]]
];

const padding = 3;

const createNewBlock = (grid) => {
  const r = Math.floor(Math.random() * 5);
  const block = tetriminos[r];
  for (let row = 0; row < block.length; row++) {
    for (let column = 0; column < block[row].length; column++) {
      grid[row][column + padding] = block[row][column];
    }
  }
};

// TODO Refactoring
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // do reducer stuff
    case "TICK":
      const newGrid = state.grid.map((arr) => {
        return arr.slice();
      });
      if (state.newBlock) {
        createNewBlock(newGrid);
        state.newBlock = false;
        state.grid = newGrid;
        return Object.assign({}, state);
      }
      for (let row = newGrid.length - 1; row >= 0; row--) {
        for (let column = 0; column < newGrid[row].length; column++) {
          if (newGrid[row][column] === 2) {
            if (newGrid[row + 1][column] === 1) {
              state.newBlock = true;
              for (let row = newGrid.length - 1; row >= 0; row--) {
                for (let column = 0; column < newGrid[row].length; column++) {
                  if(state.grid[row][column]) {
                    state.grid[row][column] = 1;
                  }
                }
              }
              return Object.assign({}, state);
            }
            newGrid[row + 1][column] = 2;
            newGrid[row][column] = 0;
          }
        }
      }
      state.grid = newGrid;
      return Object.assign({}, state);
    default:
      return state;
  }
}
