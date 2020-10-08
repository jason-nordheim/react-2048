import React, { useState } from "react";
// css 
import "./App.css";
// components 
import Board from "./components/Board";
import ControlPanel from './components/ControlPanel'
import Header from './components/Header'
import ScoreBoard from './components/ScoreBoard'
// hooks
import useBoard from "./hooks/useBoard";




/**
 * Root Component 
 */
function App() {
  const [started, setStarted] = useState(false)
  const [tiles, gameOver, points, turns, start, slide] = useBoard();

  /**
   * function to start the game 
   */
  const startGame = () => {
    start() 
    setStarted(true)
  }

  return (
    <div className="app">
      <Header /> 
      <ScoreBoard points={points} turns={turns} />
      <div className="game_container">
        <Board tiles={tiles} />
        <ControlPanel started={started} startGame={startGame} gameOver={gameOver} slide={slide} /> 
      </div>
    </div>
  );
}

export default App;
