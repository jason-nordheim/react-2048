import { useState, useEffect } from 'react'
import { createBoard, gameFinished, newTile, randomIndex, slideUp, slideDown, slideRight, slideLeft, isDifferent, placeNewTile, generateNewGame } from '../utils/BoardUtilities'

function useBoard(){
  const [tiles, setTiles] = useState(createBoard())
  const [gameOver, setGameOver] = useState(false)
  const [turns, setTurns] = useState(0)

  // anytime the tiles array changes, 
  // check to see if the game is complete 
  useEffect(() => {
    setGameOver(gameFinished(tiles))
  }, [tiles])


  /**
   * Starts the game
   */
  function start(){
    setTiles(generateNewGame());
  }

  /**
   * Slides the tiles on the board in the provided direction 
   * @param {string} direction 
   */
  function slide(direction){
    let newBoard = []
    switch (direction) {
      case "up":
        newBoard = slideUp(tiles);
        break;
      case "down":
        newBoard = slideDown(tiles) 
        break;
      case "right":
        newBoard = slideRight(tiles)
        break;
      case "left":
        newBoard = slideLeft(tiles)
        break;
      default:
        break;
    }

    /* Increment turn counter */
    if(isDifferent(newBoard,tiles)) {
      setTurns(turns + 1) 
      setTiles(placeNewTile(newBoard)) 
    }
  }



  return [tiles, gameOver, start, slide]
}

export default useBoard