/*
 * Mapping movement of tiles around in the board array
 * ... returns the new index of the provided input index
 */
const UP_MAP = [0, 1, 2, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DOWN_MAP = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 12, 13, 14, 15];
const LEFT_MAP = [0, 0, 1, 2, 4, 4, 5, 6, 8, 8, 9, 10, 12, 12, 13, 14];
const RIGTH_MAP = [1, 2, 3, 3, 5, 6, 7, 7, 9, 10, 11, 11, 13, 14, 15, 15];
const CLOCKWISE_MAP = [3,7,11,15,2,6,10,14,1,5,9,13,0,4,8,12]
const COUNTER_CLOCKWISE_MAP = [12,8,4,0,13,9,5,1,14,10,6,2,15,11,7,3]

/**
 * take the direction the tiles are moving, 
 * and its starting index and returning the 
 * destination index 
 * @param {string} direction 
 * @param {number} index 
 */
export function getIndex(direction, index) {
  if (direction === "up") return UP_MAP[index]
  else if (direction === "down") return DOWN_MAP[index]
  else if (direction === "right") return RIGTH_MAP[index];
  else if (direction === "left") return LEFT_MAP[index];
  else throw new Error("invalid direction");
}


/**
 * Creates a new board with two tiles 
 * placed on the board 
 */
export function generateNewGame() {
  let board = createBoard();
  board = placeNewTile(board)
  board = placeNewTile(board)
  return board 
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
 * @returns {boolean} gameStatus
 */
export function gameFinished(tiles) {
  // default to the game being over
  let gameOver = true;
  // if any of the tiles are unused (t === 0)
  // then the game is not over 
  tiles.forEach((t) => t === 0 ? gameOver = false : null );
  return gameOver;
}

/**
 * Move the tiles upward on the board 
 * returning a new board with all the tiles 
 * positions moved toward the top 
 * @param {Array<number>} board
 * @returns {Array<number} newBoard 
 */
export function slideUp(board, mergedIndices = []) {
  const newBoard = [...board];
  let unMoveableTiles = 0; 

  // all the tiles with values
  const mappedTiles = newBoard
    .map((value, index) => ({ value, indicies: { old: index, new: getIndex("up", index) }}))
    .filter((tiles) => tiles.value !== 0)
    .sort(sortTilesByIndex);

  /* figure out how many tiles moved by counting the ones
   * that have the same new/previous values  */
  const tilesToMove = mappedTiles
    .filter(tile => tile.indicies.new !== tile.indicies.old)
    .length


  // if no tiles were moved, there is no more
  // sliding to do
  if (tilesToMove === 0) {
    return newBoard;
  } else {
    // place the new tiles in their new positions and
    // fill the old positions with empty tiles
    for (let i = 0; i < mappedTiles.length; i++) {
      if (tilesToMove === unMoveableTiles) {
        // no more tiles to move 
        return newBoard; 
      } else if (mergedIndices.includes(mappedTiles[i].indicies.new)) {
        // if the destination is in the tiles merged
        // and the number of tiles left to move is 1, 
        // then this is the last merge
        if (tilesToMove === (unMoveableTiles + mergedIndices.length)) {
          return newBoard
        }
        unMoveableTiles++;
        continue;
      } else if (mappedTiles[i].indicies.new === mappedTiles[i].indicies.old) {
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
        // combine tiles and null old tile location
        newBoard[mappedTiles[i].indicies.new] = mappedTiles[i].value * 2;
        newBoard[mappedTiles[i].indicies.old] = 0;
        // save the index of the merged tile so that it
        // won't be re-merged within the same turn
        mergedIndices.push(mappedTiles[i].indicies.new);
      } else {
        console.log("unmovable tile found");
        // the tiles have different values and cannot be merged
        unMoveableTiles++;
        continue;
      }
    }



    // if the number of tiles that cannot be moved is
    // the same as the number of tiles that are supposed to
    // be moved, then we are done moving tiles
    if (unMoveableTiles === tilesToMove) {
      return newBoard;
    }
    
    // keep doing this till nothing can move
    return slideUp(newBoard);
  }
}

/**
 * Recieves the collection of values for the tiles 
 * on the board, and re-uses rotates the board by 180°
 * so that we can always slide the tile upward following 
 * the same logic used in the `slideUp` function 
 * @param {Array<number>} board 
 * @returns {Array<number} newBoard 
 */
export function slideDown(board) {
  // rotate the board so that we can parse vertically
  const rotatedBoard = rotateCounterClockwise(rotateCounterClockwise(board));
  // slide and merge tiles
  const slideBoard = slideUp(rotatedBoard);
  // undo rotatation
  return rotateClockwise(rotateClockwise(slideBoard));
}


/**
 * Recieves the current board as a parameter, 
 * and returns that board with all the tiles 
 * slide (and combined if applicable) to the 
 * right edge of the board 
 * @param {Array<number>} board 
 * @returns {Array<number>} board 
 */
export function slideRight(board) {
  // rotate the board so that we can parse vertically 
  const rotatedBoard = rotateCounterClockwise(board)
  // slide and merge tiles 
  const slideBoard = slideUp(rotatedBoard)
  // undo rotatation 
  return rotateClockwise(slideBoard)
}

/**
 * Recieves the current board as a parameter, 
 * and returns that board with all the tiles 
 * slide (and combined if applicable) to the 
 * left edge of the board 
 * @param {Array<number>} board 
 * @returns {Array<number>} board 
 */
export function slideLeft(board) {
  // rotate the board so that we can parse vertically 
  const rotatedBoard = rotateClockwise(board)
  // slide and merge tiles 
  const slideBoard = slideUp(rotatedBoard)
  // undo rotatation 
  return rotateCounterClockwise(slideBoard)
}


/**
 * Takes a 2048 board as an array of numbers (4x4 only)
 * reformats the position of those numbers to represent 
 * a board that has been rotated 90° clockwise 
 * @param {Array<number>} board 
 * @returns {Array<number>} board 
 */
function rotateClockwise(board){
  return board
    .map((value, index) => ({ value, index: CLOCKWISE_MAP[index]}))
    .sort((a, b) => a.index - b.index)
    .map(tile => tile.value)
}

/**
 * Takes a 2048 board as an array of numbers (4x4 only)
 * reformats the position of those numbers to represent 
 * a board that has been rotated 90° clockwise 
 * @param {Array<number>} board 
 * @returns {Array<number>} board 
 */
function rotateCounterClockwise(board){
  return board
    .map((value, index) => ({ value, index: COUNTER_CLOCKWISE_MAP[index]}))
    .sort((a, b) => a.index - b.index)
    .map(tile => tile.value)
}

/**
 * Takes a 4x4 2048 board and places a new 
 * tile randomly on the board 
 * @param {Array<number>} board 
 */
export function placeNewTile(board) {
  // generate a random spot on
  // the board to place a new tile
  let index = randomIndex();
  // make sure not to replace
  // any existing tiles
  while (board[index] !== 0) {
    index = randomIndex();
  }
  const boardCopy = [...board];
  boardCopy[index] = newTile();
  return boardCopy
}

/**
 * Takes in two board and determines if 
 * all the values in the array representing the 
 * 2048 board are the same 
 * @param {Array<number>} boardA 
 * @param {Array<number>} boardB 
 * @returns {boolean} 
 */
export function isDifferent(boardA, boardB) {
  // look at every space in boardA and boardB, 
  // as soon as a difference in values at the same 
  // index position are found then the we know two 
  // boards are not the same and we can return 
  for (let i = 0; i < boardA.length; i++) {
    if(boardA[i] !== boardB[i]) {
      return true 
    }
  }
  return false
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
