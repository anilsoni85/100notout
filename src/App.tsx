import React, { useState } from 'react';
import './App.css';
import { GameSetup } from './components/game-setup';
import { ScoreHistory } from './components/score-history';
import { ScoreSummary } from './components/score-summary';
import { Navigation } from './components/navigation';
import { Game, loadGame, createNewGame, removeGame, resetGame, saveGame, addRound } from './types/game'

const App = () : JSX.Element => {
  let [game, setGame]  = useState(loadGame());

  const handleStartGame = (playerNames : string[]) => {
    let game : Game = createNewGame(playerNames);
    setGame(game);
  }

  const handleNewGame = () => {
    if (window.confirm("Do you really want to start new game?\r\nAre you sure?")) {
      removeGame();
      setGame(null);
    }
  }

  const handleResetGame = () => {
    if (game != null 
      && window.confirm("Do you really want to reset score?\r\nAre you sure?")) {
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
  return (
  <div className="App">
    <Navigation showButtons={game != null}onNewGame={handleNewGame} onResetScore={handleResetGame}/>
    {game == null && <GameSetup onStartGame={handleStartGame} /> }
    {game 
      && <>
        <ScoreSummary game={game} onAddRound={handleAddRound}/>
        <ScoreHistory game={game} />
      </>
    }
  </div>);
}

export default App;
