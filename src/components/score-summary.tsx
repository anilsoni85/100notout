import React, { useState } from 'react';
import { Game } from '../types/game';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
type ScoreProps = {
  game : Game;
  onAddRound: (scores: number[], declaredBy : number) => void; 
}

export const ScoreSummary = (props : ScoreProps) : JSX.Element => {
  const initState = { scores : new Array<number>(props.game.PlayerNames.length).fill(0) };
  let [roundScores, setRoundScores] = useState({...initState});

  const handleScoreChange = (index : number, value : string) => {
    roundScores.scores[index] = parseInt(value);
    setRoundScores(roundScores);
  }

  const handleAddRoundClick = () => {
    props.onAddRound(roundScores.scores, 0);
    setRoundScores({...initState});
  }
  
  return (<table className="table table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Total</th>
      <th>Current</th>
    </tr>
  </thead>
  <tbody>
  {
    props.game.PlayerNames.map((name : string, index : number) => 
      <tr key={index}>
        <td>{index === props.game.Winner ? `${name} 👑` : name }</td>
        <td>{props.game.TotalScore[index]}</td>
        <td><Form.Control 
          type="number" 
          value={roundScores.scores[index]} 
          onChange={(evt) => 
          handleScoreChange(index, evt.target.value)} 
          min="0" 
          max="50"
          placeholder="Enter sum of cards"
          inputMode="numeric"
          size="sm"/></td>
      </tr>)
  }
  <tr>
    <td colSpan={3}><Button variant="primary" onClick={handleAddRoundClick}>Add Round</Button></td>
  </tr>
  </tbody>
</table>);
}