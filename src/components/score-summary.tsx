import React from 'react';
import { Game } from '../types/game';
import Form from 'react-bootstrap/Form';
type ScoreProps = {
  game : Game;
}

export const ScoreSummary = (props : ScoreProps) : JSX.Element => {
  let players = Array.from(props.game.PlayerNames.keys());
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
    players.map(p => 
      <tr key={p}>
        <td>{props.game.PlayerNames[p]}</td>
        <td>{props.game.TotalScore[p]}</td>
        <td><Form.Control type="text" /></td>
      </tr>)
  }
  </tbody>
</table>);
}