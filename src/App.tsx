import React, { useState } from 'react';
import './App.css';
import { GameSetup } from './components/game-setup';
import { ScoreHistory } from './components/score-history';
import { ScoreSummary } from './components/score-summary';
import { Game, loadGame, createNewGame, resetGame } from './types/game'
import Button from 'react-bootstrap/Button';

function App() {
  let [game, setGame]  = useState(loadGame());

  const handleStartGame = (playerNames : string[]) => {
    let game : Game = createNewGame(playerNames);
    setGame(game);
  }

  const handleResetGame = () => {
    resetGame();
    setGame(null);
  }

  if (game == null)
    return (
      <div className="App">    
        <GameSetup onStartGame={handleStartGame} />
      </div>
    );
  else
    return (
      <div className="App">
        <Button variant="danger" onClick={handleResetGame}>Reset Game</Button>
        <ScoreSummary game={game} />
        <ScoreHistory game={game} />
      </div>
    );
}

export default App;
