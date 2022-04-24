import React from 'react';
import { Game } from '../types/game';

type ScoreTableProps = {
  game : Game;
}

export const ScoreTable = (props : ScoreTableProps) : JSX.Element => {
  let players = Array.from(props.game.PlayerNames.keys());
  return (<table className="table">
  <thead>
    <tr>
      <th>#</th>
      { props.game.PlayerNames.map(name => <th>{name}</th>) }
    </tr>
  </thead>
  <tbody>
  {
    props.game.Rounds.map(round => {
    return (
      <tr key={round.Id}>
        <td>Round {round.Id}</td>
        { players.map(p => <td>{` ${round.Winner === p ? '*':''} ${round.Score[p]} (${round.Sum[p]}${round.Penalty === p ? 'P':''})`}</td>) }
      </tr>)})
  }
  <tr key={0}>
      <th>Total</th>
      { props.game.TotalScore.map(score => <th>{score}</th>) }
  </tr>
  </tbody>
</table>);
}