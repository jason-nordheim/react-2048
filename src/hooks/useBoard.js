import { useState, useEffect } from 'react'
import { createBoard, gameFinished, slideUp, slideDown, slideRight, slideLeft, isDifferent, placeNewTile, generateNewGame } from '../utils/BoardUtilities'

/**
 * Hook to handle the functionality of the game 
 */
function useBoard(){
  const [tiles, setTiles] = useState(createBoard())
  const [gameOver, setGameOver] = useState(false)
  const [turns, setTurns] = useState(0)
  const [points, setPoints] = useState(0) 

  /* anytime the tiles array changes, 
   * check to see if the game is complete */ 
  useEffect(() => {
    setGameOver(gameFinished(tiles))
  }, [tiles])


  /**
   * Starts/restarts the game
   */
  function start(){
    setTurns(0)
    setPoints(0)
    setTiles(generateNewGame());
  }

  /**
   * Slides the tiles on the board in the provided direction 
   * @param {string} direction 
   */
  function slide(direction){
    let slideResult;  
    switch (direction) {
      case "up":
        slideResult = slideUp(tiles);
        break;
      case "down":
        slideResult = slideDown(tiles); 
        break;
      case "right":
        slideResult = slideRight(tiles);
        break;
      case "left":
        slideResult = slideLeft(tiles);
        break;
      default:
        break;
    }
    
    const [newBoard, scoredPoints] = slideResult

    /* Increment turn counter */
    if(isDifferent(newBoard,tiles)) {
      setTurns(turns + 1) 
      setPoints(points + scoredPoints)
      setTiles(placeNewTile(newBoard)) 
    }
  }



  return [tiles, gameOver, points, turns, start, slide]
}

export default useBoard