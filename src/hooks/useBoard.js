import { useState, useEffect } from 'react'
import { createBoard, gameFinished, newTile, randomIndex, indexUp, slideUp } from '../utils/BoardUtilities'

function useBoard(){
  const [tiles, setTiles] = useState(createBoard())
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    setGameOver(gameFinished(tiles)) 
  }, [tiles])

  /**
   * Starts the game
   * 
   * generates 2 random indexes to place tiles 
   * generates 2 random tiles to be placed at the random indexes  
   */
  function start(){
    const tilesCopy = createBoard() 
    const index1 = randomIndex() 
    let index2 = randomIndex() 
    while (index1 === index2) {
      index2 = randomIndex() 
    }
    tilesCopy[index1] = newTile() 
    tilesCopy[index2] = newTile() 
    setTiles(tilesCopy)
  }

  /**
   * Slides the tiles on the board in the provided direction 
   * @param {string} direction 
   */
  function slide(direction){
    switch (direction) {
      case "up":
        setTiles(slideUp(tiles)) 
        break;
      case "down":
        break;
      case "right":
        break;
      case "left":
        break;
      default:
        break;
    }
  }



  return [tiles, gameOver, start, slide]
}

export default useBoard