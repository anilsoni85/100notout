import React, { useState } from 'react';
import './App.css';
import { GameSetup } from './components/game-setup';
import { ScoreHistory } from './components/score-history';
import { ScoreSummary } from './components/score-summary';
import { Game, loadGame, createNewGame, removeGame, resetGame, saveGame, addRound } from './types/game'
import Button from 'react-bootstrap/Button';

const App = () : JSX.Element => {
  let [game, setGame]  = useState(loadGame());

  const handleStartGame = (playerNames : string[]) => {
    let game : Game = createNewGame(playerNames);
    setGame(game);
  }

  const handleNewGame = () => {
    removeGame();
    setGame(null);
  }

  const handleResetGame = () => {
    if (game != null) {
      const updatedGame = {...game};
      resetGame(updatedGame);
      setGame(updatedGame);
    }
  }

  const handleAddRound = (scores: number[], declaredBy: number) => {
    if (game != null) {
      const updatedGame = {...game};
      addRound(updatedGame, scores, declaredBy);
      saveGame(updatedGame);
      setGame(updatedGame);
    }
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
        <Button variant="danger" onClick={handleNewGame}>New Game</Button>&nbsp;
        <Button variant="danger" onClick={handleResetGame}>Reset Game</Button>
        <ScoreSummary game={game} onAddRound={handleAddRound}/>
        <ScoreHistory game={game} />
      </div>
    );
}

export default App;
