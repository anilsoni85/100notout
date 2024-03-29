import React, { useState } from 'react';
import { Game, isPlayerOut, isValidScore, Round } from '../types/game';
import { Button } from 'react-bootstrap';
import { ScoreInput } from './score-input';

type ScoreSummaryProps = {
  game : Game;
  onAddRound: (scores: number[], declaredBy : number) => void; 
  onEditLastRound: () => Round | undefined;
}
type ScoreSummaryState = {
  scores : number[],
  declaredBy : number
}
export const ScoreSummary = (props : ScoreSummaryProps) : JSX.Element => {
  const getInitState = () : ScoreSummaryState => {
    const initState : ScoreSummaryState = { 
      scores : props.game.PlayerNames.map(n => NaN), 
      declaredBy : -1 
    };
    return initState;
  }

  let [state, setState] = useState<ScoreSummaryState>(getInitState());

  const handleScoreChange = (index : number, newScore : number) => {
    const updatedState : ScoreSummaryState = {...state};
    updatedState.scores[index] = newScore;
    setState(updatedState);
  }

  const handleDeclaredChange = (index : number, declared : boolean) => {
    if (declared && index !== state.declaredBy) {
      const updatedState : ScoreSummaryState = {...state};
      updatedState.declaredBy = index;
      setState(updatedState);
    }
    else if (!declared && index === state.declaredBy) {
      const updatedState : ScoreSummaryState = {...state};
      updatedState.declaredBy = -1;
      setState(updatedState);
    }
  }

  const handleAddRoundClick = () => {
    props.onAddRound(state.scores, state.declaredBy);
    setState(getInitState());
  }

  const handleEditLastRound = () => {
    const removedRound = props.onEditLastRound();
    if (removedRound) {
      const scoreSummaryState : ScoreSummaryState = {
        scores : removedRound.Sum,
        declaredBy : removedRound.DeclaredBy
      };
      setState(scoreSummaryState);
    }
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
        <td width={120}>
          <ScoreInput 
            score={state.scores[index]} 
            declared={state.declaredBy === index}
            isOut={isPlayerOut(props.game, index)}
            onScoreChange={(newScore) => handleScoreChange(index, newScore)}
            onDeclaredChange={(declared) => handleDeclaredChange(index, declared)}/> 
         </td>
      </tr>)
  }
  <tr>
    <td colSpan={4}>
      <Button 
        size="sm" 
        variant="primary" 
        onClick={handleAddRoundClick} 
        disabled={!isValidScore(props.game, state.scores, state.declaredBy)}>Add Round</Button>
      &nbsp;
      <Button 
        size="sm" 
        variant="danger" 
        onClick={handleEditLastRound} 
        disabled={props.game.Rounds.length <= 0}>Edit Last Round</Button>
      </td>
  </tr>
  </tbody>
</table>);
}