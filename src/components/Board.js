import React from 'react'
import Tile from './Tile'

/**
 * 2048 Board Component 
 * @param {number[]} param0 
 */
function Board({tiles}) {
  return (
    <div className="board_container">
      <div className="board">
        {tiles.map((tile, index) => <Tile key={index} number={tile} />)}
      </div>
    </div>
  );
}

export default Board
