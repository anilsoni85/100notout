import React, { useState } from 'react';
import { Game, initRoundScore, isPlayerOut, isValidScore } from '../types/game';
import { Button } from 'react-bootstrap';
import { ScoreInput } from './score-input';

type ScoreSummaryProps = {
  game : Game;
  onAddRound: (scores: number[], declaredBy : number) => void; 
}
type ScoreSummaryState = {
  scores : number[]
}
export const ScoreSummary = (props : ScoreSummaryProps) : JSX.Element => {
  const getInitState = () : ScoreSummaryState => {
    const initState : ScoreSummaryState = { scores : initRoundScore(props.game)};
    return initState;
  }

  let [state, setState] = useState<ScoreSummaryState>(getInitState());

  const handleScoreChange = (index : number, newScore : number) => {
    const updatedState : ScoreSummaryState = {...state};
    updatedState.scores[index] = newScore;
    setState(updatedState);
  }

  const handleAddRoundClick = () => {
    props.onAddRound(state.scores, 3);
    setState(getInitState());
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
            score={state.scores[index]} 
            isOut={isPlayerOut(props.game, index)}
            onScoreChange={(newScore) => handleScoreChange(index, newScore)}/> 
         </td>
      </tr>)
  }
  <tr>
    <td colSpan={4}>
      <Button 
        variant="primary" 
        onClick={handleAddRoundClick} 
        disabled={!isValidScore(props.game, state.scores)}>Add Round</Button>
      </td>
  </tr>
  </tbody>
</table>);
}