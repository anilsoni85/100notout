import React from 'react';
import { Game } from '../types/game';

type ScoreHistoryProps = {
  game : Game;
}

export const ScoreHistory = (props : ScoreHistoryProps) : JSX.Element => {
  return (<table className="table table-striped table-bordered">
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
        <td width={60}><b>{round.Id}</b></td>
        { 
          round.Score.map((score, index) =>
            {
              if (isNaN(score))
                return (<td key={`r${round.Id}p${index}`}>-</td>);
              else 
                return (<td key={`r${round.Id}p${index}`} style={{color: round.Penalty === index ? "red" : round.Winner === index ? "#3CB371" : "black"}}>
                  {score}<sub>{round.Sum[index]}</sub>
                </td>);
                
            }
          ) 
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