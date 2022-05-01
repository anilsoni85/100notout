import React from 'react';
import { Button, Form, Stack, ToggleButton } from 'react-bootstrap';

type ScoreInputProps = {
  score : number,
  isOut: boolean,
  declared : boolean,
  onScoreChange : (newScore : number) => void;
  onDeclaredChange : (declared : boolean) => void;
}

export const ScoreInput = (props : ScoreInputProps) => {  

  const handleChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
    let newScore = parseInt(evt.target.value);
    if (isNaN(newScore))
      newScore = 0;
    if (newScore === 0)
      evt.target.select();
    props.onScoreChange(newScore);
  }

  const handleClick = (evt : any) => {
    props.onDeclaredChange(!props.declared);
  }

  if (props.isOut)
    return (<label>Out</label>);
  else
  //⚐
  //<div className="vr" />
    return (
      <Stack direction="horizontal" gap={1}>
      <Button size="sm" variant={props.declared ? "success" : "secondary"} onClick={handleClick}>{props.declared ? "D" : "N"}</Button>
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
      </Stack>
    );
  }