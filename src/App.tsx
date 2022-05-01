import React, { useState } from 'react';
import './App.css';
import { GameSetup } from './components/game-setup';
import { ScoreHistory } from './components/score-history';
import { ScoreSummary } from './components/score-summary';
import { Navigation } from './components/navigation';
import { Game, loadGame, createNewGame, removeGame, resetGame, saveGame, addRound } from './types/game'
import Button from 'react-bootstrap/Button';
import { Footer } from './components/footer';

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
    <Footer />
  </div>);
}

export default App;
