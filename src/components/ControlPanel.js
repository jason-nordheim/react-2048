import React from 'react'
import useEventListener from '../hooks/useEventListener'

function ControlPanel({ gameOver, started, startGame, slide }) {

  // leverage event listener hook to
  // listen for key presses
  useEventListener("keyup", (event) => {
    // do nothing if the game hasn't started
    // do nothing if the event object is null
    if (started && event) {
      if (event.key === "ArrowRight") return slide("right");
      else if (event.key === "ArrowLeft") return slide("left");
      else if (event.key === "ArrowUp") return slide("up");
      else if (event.key === "ArrowDown") return slide("down");
    } 
  });

  return (
    <div className="controlPanel">
      <button className="start_button" onClick={() => startGame()}>
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
