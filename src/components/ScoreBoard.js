import React from 'react'

function ScoreBoard({turns, points}) {
  return (
    <div className="scoreBoard">
      <div className="stat">
        <span className="label">Turns</span>
        <span className="val">{turns}</span>
      </div>
      <div className="stat">
        <span className="label">Points</span>
        <span className="val">{points}</span>
      </div>
    </div>
  );
}

export default ScoreBoard
