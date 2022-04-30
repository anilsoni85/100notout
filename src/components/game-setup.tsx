import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type GameSetupProps = {
  onStartGame: (playerName : string[]) => void;
};

export const GameSetup = (props : GameSetupProps) => {

  let [newPlayerName, setNewPlayerName] = useState("");
  let [playerNames, setPlayerNames] = useState(new Array<string>());

  const handleAddPlayer = () => {
    if (newPlayerName !== "") {
      playerNames.push(newPlayerName);
      setNewPlayerName("");
      setPlayerNames(playerNames);  
    }
  }

  return (<>
  <ol>
    { playerNames.map((name, index) => <li key={index}>{name}</li>) }
    <li>
      <Form.Control type="text" placeholder="Player Name" onChange={(ev) => setNewPlayerName(ev.target.value)} value={newPlayerName}/>
      <Button variant="dark" onClick={handleAddPlayer}>Add Player</Button>&nbsp;
    </li>
  </ol>
  <Button variant="primary" onClick={() => props.onStartGame(playerNames)}>Start Game</Button>
  </>);
}