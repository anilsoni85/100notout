import React, { useState } from 'react';
import './App.css';
import { GameSetup } from './components/game-setup';
import { ScoreHistory } from './components/score-history';
import { ScoreSummary } from './components/score-summary';
import { Navigation } from './components/navigation';
import { Game, loadGame, createNewGame, removeGame, resetGame, saveGame, addRound, removeLastRound, Round } from './types/game'

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

  const handleEditLastRound = () : Round | undefined => {
    if (game != null
      && window.confirm("Do you really want to edit last round?")) {
      const updatedGame = {...game};
      const removedRound = removeLastRound(updatedGame);
      saveGame(updatedGame);
      setGame(updatedGame);
      return removedRound;
    }
  }

  return (
  <div className="App">
    <Navigation showButtons={game != null}onNewGame={handleNewGame} onResetScore={handleResetGame}/>
    {game == null && <GameSetup onStartGame={handleStartGame} /> }
    {game 
      && <>
        <ScoreSummary game={game} onAddRound={handleAddRound} onEditLastRound={handleEditLastRound} />
        <ScoreHistory game={game} />
      </>
    }
  </div>);
}

export default App;
