import React, { useState } from 'react';
import { Game } from '../types/game';
import { Button } from 'react-bootstrap';
import { ScoreInput } from './score-input';

type ScoreProps = {
  game : Game;
  onAddRound: (scores: number[], declaredBy : number) => void; 
}
type RoundScoreState = {
  scores : number[]
}
export const ScoreSummary = (props : ScoreProps) : JSX.Element => {
  const initState = { scores : new Array<number>(props.game.PlayerNames.length).fill(0) };
  let [roundScores, setRoundScores] = useState<RoundScoreState>({...initState});

  const handleScoreChange = (index : number, newScore : number) => {
    const updatedScores : RoundScoreState = {...roundScores};
    updatedScores.scores[index] = newScore;
    setRoundScores(updatedScores);
  }

  const handleAddRoundClick = () => {
    props.onAddRound(roundScores.scores, 0);
    setRoundScores({...initState});
  }
  
  return (<table className="table table-striped table-bordered">
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th>Name</th>
      <th>Total</th>
      <th>Round</th>
    </tr>
  </thead>
  <tbody>
  {
    //🏏✅👑⛔
    props.game.PlayerNames.map((name : string, index : number) => 
      <tr key={index}>
        <td width={50}>{
          index === props.game.Winner ? "👑" : 
          props.game.TotalScore[index] > 100 ? "⛔" : "✅" 
        }</td>
        <td>{name}</td>
        <td width={100}>{props.game.TotalScore[index]}</td>
        <td width={100}>
          <ScoreInput 
            score={roundScores.scores[index]} 
            readonly={props.game.TotalScore[index] > 100}
            onScoreChange={(newScore) => handleScoreChange(index, newScore)}/> 
         </td>
      </tr>)
  }
  <tr>
    <td colSpan={4}>
      <Button 
        variant="primary" 
        onClick={handleAddRoundClick} 
        disabled={roundScores.scores.filter(s => s <= 0).length > 0}>Add Round</Button>
      </td>
  </tr>
  </tbody>
</table>);
}