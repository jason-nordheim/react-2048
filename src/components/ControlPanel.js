import React from 'react'

function ControlPanel({ gameOver, started, startGame, slide }) {
  return (
    <div className="controlPanel">
      <button onClick={() => startGame()}>
        {started ? "Restart" : "Start"}
      </button>
      <button disabled={gameOver} onClick={() => slide("up")}>
        Up
      </button>
      <button disabled={gameOver} onClick={() => slide("down")}>
        Down
      </button>
      <button disabled={gameOver} onClick={() => slide("left")}>
        Left
      </button>
      <button disabled={gameOver} onClick={() => slide("right")}>
        Right
      </button>
    </div>
  );
}

export default ControlPanel
