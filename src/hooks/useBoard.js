import React, { useState, useEffect } from 'react'
import { createBoard } from '../helpers/tileHelpers'

/**
 * hook to abstract functionality of board
 * @param {number} x axis dimension
 * @param {number} y axis dimension
 */
const useBoard = (x=4, y=4) => {
  const [tiles, setTiles] = useState(createBoard(x,y))
  
  const moveLeft = () => {
    for (let i = 0; i < x; i++) {
      const row = tiles[i];
      for (let j = 0; j < y; j++) {
        const tile = row[j];
        console.log(i,j,tile)
        if(tile.value !== 0 && i !== 0){

        }
      }
    }
  }

  const moveRight = () => {};
  const moveDown = () => {};
  const moveUp = () => {};

  useEffect(() => {
    console.log(tiles[0][0])
    moveLeft()
  }, [tiles])

  return [tiles]
}


export default useBoard