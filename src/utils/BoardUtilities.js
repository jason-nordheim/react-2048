/*
 * Mapping movement of tiles around in the board array
 * ... returns the new index of the provided input index
 */
const UP_MAP = [0, 1, 2, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DOWN_MAP = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 12, 13, 14, 15];
const LEFT_MAP = [0, 0, 1, 2, 4, 4, 5, 6, 8, 8, 9, 10, 12, 12, 13, 14];
const RIGTH_MAP = [1, 2, 3, 3, 5, 6, 7, 7, 9, 10, 11, 11, 13, 14, 15, 15];

export function getIndex(direction, index) {
  if (direction === "up") {
    const out = UP_MAP[index]
    //console.log(`getIndex(${direction},${index})`, out)
    return out
  } else if (direction === "down") {
    const out = DOWN_MAP[index];
    //console.log(`getIndex(${direction},${index})`, out);
    return out;
  } else if (direction === "right") {
    const out = RIGTH_MAP[index];
    //console.log(`getIndex(${direction},${index})`, out);
    return out;
  } else if (direction === "left") {
    const out = LEFT_MAP[index];
    //console.log(`getIndex(${direction},${index})`, out);
    return out;
  } else throw new Error("invalid direction");
}

/**
 * creates an array filled with zeros
 */
export function createBoard() {
  const tiles = [];
  for (let i = 0; i < 16; i++) {
    tiles.push(0);
  }
  return tiles;
}

/**
 * Gets a random index between 0 and 16
 * to randomly place a new tile on the board
 */
export function randomIndex() {
  return Math.floor(Math.random() * 16);
}

/**
 * Generates a new tile to be placed on the
 * board
 *
 * TODO => as the level goes up, this should also
 * have a increasing chance of generating a 4
 * @returns {number} tile value
 */
export function newTile() {
  const rand = Math.random();
  return rand < 0.7 ? 2 : 4;
}

/**
 * Determines if the game is complete by checking
 * to see if there are any open spaces available
 * on the board
 * @param {Array<number>} tiles
 * @returns {boolean}
 */
export function gameFinished(tiles) {
  let gameOver = true;
  tiles.forEach((t) => {
    if (t === 0) {
      gameOver = false;
    }
  });
  return gameOver;
}

/**
 * Move the tiles upward on the board 
 * returning a new board with all the tiles 
 * positions moved toward the top 
 * @param {Array<number>} board
 * @returns {Array<number} newBoard 
 */
export function slideUp(board) {
  const newBoard = [...board];

  // all the tiles with values
  const mappedTiles = newBoard
    .map((value, index) => ({ value, indicies: { old: index, new: getIndex("up", index) }}))
    .filter((tiles) => tiles.value !== 0)
    .sort(sortTilesByIndex);

  /* figure out how many tiles moved by counting the ones
   * that have the same new/previous values  */
  const movedTiles = mappedTiles.filter(tile => tile.indicies.new !== tile.indicies.old).length
  console.log('movedTiles', movedTiles)


  // if no tiles were moved, there is no more
  // sliding to do
  if (movedTiles === 0) {
    return newBoard;
  } else {
    // place the new tiles in their new positions and
    // fill the old positions with empty tiles
    for (let i = 0; i < mappedTiles.length; i++) {   

      if (mappedTiles[i].indicies.new === mappedTiles[i].indicies.old){
        // tiles with the same index do not move
        continue
      } else if (newBoard[mappedTiles[i].indicies.new] === 0) {
        // destination is an empty space, move the tile
        // and null old value
        newBoard[mappedTiles[i].indicies.new] = mappedTiles[i].value;
        newBoard[mappedTiles[i].indicies.old] = 0;
      } else if (
        newBoard[mappedTiles[i].indicies.new] === mappedTiles[i].value
      ) {
        // the source and destination has the same value
        // and null old tile location
        newBoard[mappedTiles[i].indicies.new] = mappedTiles[i].value * 2;
        newBoard[mappedTiles[i].indicies.old] = 0;
      }
    }
    // keep doing this till nothing can move
    return slideUp(newBoard);
  }
}

export function slideDown(board) {
  const newBoard = [...board];

  // all the tiles with values
  const mappedTiles = newBoard
    .map((value, index) => ({
      value,
      indicies: { old: index, new: getIndex("down", index) },
    }))
    .filter((tiles) => tiles.value !== 0)
    .sort(sortTilesByIndex);

  /* figure out how many tiles moved by counting the ones
   * that have the same new/previous values  */
  const movedTiles = mappedTiles.filter(
    (tile) => tile.indicies.new !== tile.indicies.old
  ).length;
  console.log("movedTiles", movedTiles);

  // if no tiles were moved, there is no more
  // sliding to do
  if (movedTiles === 0) {
    return newBoard;
  } else {
    // place the new tiles in their new positions and
    // fill the old positions with empty tiles
    for (let i = 0; i < mappedTiles.length; i++) {
      if (mappedTiles[i].indicies.new === mappedTiles[i].indicies.old) {
        // tiles with the same index do not move
        continue;
      } else if (newBoard[mappedTiles[i].indicies.new] === 0) {
        // destination is an empty space, move the tile
        // and null old value
        newBoard[mappedTiles[i].indicies.new] = mappedTiles[i].value;
        newBoard[mappedTiles[i].indicies.old] = 0;
      } else if (
        newBoard[mappedTiles[i].indicies.new] === mappedTiles[i].value
      ) {
        // the source and destination has the same value
        // and null old tile location
        newBoard[mappedTiles[i].indicies.new] = mappedTiles[i].value * 2;
        newBoard[mappedTiles[i].indicies.old] = 0;
      }
    }
    // keep doing this till nothing can move
    return slideUp(newBoard);
  }
}





/**
 * Implements comparison to determine which tile has the lower
 * index value
 * @param {{value:number,index: number}} tileA
 * @param {{value:number,index:number}} tileB
 * @returns number ...
 */
function sortTilesByIndex(tileA, tileB) {
  if (tileA === null || tileB === null)
  return tileA.index < tileB.index ? -1 : 1 
}
