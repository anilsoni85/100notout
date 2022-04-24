import React from 'react';
import './App.css';
import { GameSetup } from './components/game-setup';
import { ScoreTable } from './components/score-table';
import { mockGame } from './types/mock';
function App() {
  return (
    <div className="App">
      <GameSetup game={mockGame} />
      <ScoreTable game={mockGame} />
    </div>
  );
}

export default App;
