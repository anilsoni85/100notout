import React, { useState } from 'react';
import { Game } from '../types/game';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
type ScoreProps = {
  game : Game;
  onAddRound: (scores: number[], declaredBy : number) => void; 
}

export const ScoreSummary = (props : ScoreProps) : JSX.Element => {
  let [scores, setScores] = useState(new Array<number>());

  const handleScoreChange = (index : number, value : string) => {
    scores[index] = parseInt(value);
    setScores(scores);
  }

  const handleAddRoundClick = () => {
    props.onAddRound(scores, 0);
    setScores(scores.map(s => 0));
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
        <td>{name}</td>
        <td>{props.game.TotalScore[index]}</td>
        <td><Form.Control type="text" value={scores[index]} onChange={(evt) => handleScoreChange(index, evt.target.value)}/></td>
      </tr>)
  }
  <tr>
    <td colSpan={3}><Button variant="primary" onClick={handleAddRoundClick}>Add Round</Button></td>
  </tr>
  </tbody>
</table>);
}