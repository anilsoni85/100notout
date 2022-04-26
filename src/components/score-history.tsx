import React from 'react';
import { Game } from '../types/game';

type ScoreTableProps = {
  game : Game;
}

export const ScoreHistory = (props : ScoreTableProps) : JSX.Element => {
  console.log(`Inside ScoreHistory render ${props.game.Rounds.length}`);
  return (<table className="table table-striped">
  <thead>
    <tr>
      <th>Round</th>
      { props.game.PlayerNames.map((name, index) => <th key={`p${index}`}>{name}</th>) }
    </tr>
  </thead>
  <tbody>
  {
    props.game.Rounds.map(round => {
    return (
      <tr key={round.Id}>
        <td>{round.Id}</td>
        { 
          round.Score.map((score, index) => <td key={`r${round.Id}p${index}`}>{score}<sub>{round.Sum[index]}</sub></td>) 
        }
      </tr>)})
  }
  <tr>
      <th>Total</th>
      { props.game.TotalScore.map((score, index) => <th key={`t${index}`}>{score}</th>) }
  </tr>
  </tbody>
</table>);
}