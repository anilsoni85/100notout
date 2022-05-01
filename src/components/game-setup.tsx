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

  //<Button variant="dark" onClick={handleAddPlayer}>Add Player</Button>&nbsp;
  return (<>
  <ol>
    { playerNames.map((name, index) => <li key={index}>{name}</li>) }
    <li>
      <form onSubmit={handleAddPlayer}>
      <Form.Control type="text" placeholder="Player Name" onChange={(ev) => setNewPlayerName(ev.target.value)} value={newPlayerName}/>
      </form>    
    </li>
  </ol>
  <Button 
    variant="primary" 
    disabled={playerNames.length<3}
    onClick={() => props.onStartGame(playerNames)}>Start Game</Button><br/>
  1. Add 3 or more player and click on Start game to begin. 
  </>);
}