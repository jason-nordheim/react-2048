import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import ControlPanel from './components/ControlPanel'
import useBoard from "./hooks/useBoard";

function App() {
  const [started, setStarted] = useState(false)
  const [tiles, gameOver, start, slide] = useBoard();

  const startGame = () => {
    start() 
    setStarted(true)
  }

  return (
    <div className="app">
      <Board tiles={tiles} />
      <ControlPanel started={started} startGame={startGame} gameOver={gameOver} slide={slide} /> 
    </div>
  );
}

export default App;
