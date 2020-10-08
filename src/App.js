import React, { useState } from "react";
// css 
import "./App.css";
// components 
import Board from "./components/Board";
import ControlPanel from './components/ControlPanel'
import Header from './components/Header'
// hooks
import useBoard from "./hooks/useBoard";




/**
 * Root Component 
 */
function App() {
  const [started, setStarted] = useState(false)
  const [tiles, gameOver, start, slide] = useBoard();

  const startGame = () => {
    start() 
    setStarted(true)
  }

  return (
    <div className="app">
      <Header /> 
      <div className="game_container">
        <Board tiles={tiles} />
        <ControlPanel started={started} startGame={startGame} gameOver={gameOver} slide={slide} /> 
      </div>
    </div>
  );
}

export default App;
