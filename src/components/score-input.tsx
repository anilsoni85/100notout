import React from 'react';
import { Form } from 'react-bootstrap';

type ScoreInputProps = {
  score : number,
  readonly: boolean,
  onScoreChange : (newScore : number) => void;
}

export const ScoreInput = (props : ScoreInputProps) => {  

  const handleChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
    let newScore = parseInt(evt.target.value);
    if (!isNaN(newScore)) {
      props.onScoreChange(newScore);
    }
  }

  if (props.readonly)
    return (<label>Out</label>);
  else
  //⚐
    return (
      <Form.Control 
            type="number" 
            value={props.score}
            onChange={handleChange} 
            min="0" 
            max="50"
            placeholder="Enter sum of cards"
            inputMode="numeric"
            onFocus={(evt) => evt.target.select()}
            size="sm"/>
    );
}