import React from 'react';
import { Game } from '../types/game';

type ScoreTableProps = {
  game : Game;
}

export const ScoreHistory = (props : ScoreTableProps) : JSX.Element => {
  let players = Array.from(props.game.PlayerNames.keys());
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
          //players.map(p => <td>{` ${round.Winner === p ? '*':''} ${round.Score[p]} (${round.Sum[p]}${round.Penalty === p ? 'P':''})`}</td>) 
          players.map((p, index) => <td key={`r${round.Id}p${index}`}>{round.Score[p]}</td>) 
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