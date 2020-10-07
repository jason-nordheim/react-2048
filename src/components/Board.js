import React from 'react'
import Tile from './Tile'

function Board({tiles}) {
  return (
    <div className="board">
      {tiles.map((tile, index) => <Tile key={index} number={tile} />)}
    </div>
  );
}

export default Board
