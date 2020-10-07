import React from 'react'
import { colorByValue } from '../utils/TileUtilities'

function Tile({number}) {

  return (
    <div className={`tile ${ colorByValue(number) }`}>
      {number}
    </div>
  )
}

export default Tile
