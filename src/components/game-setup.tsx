import React from 'react';
import Button from 'react-bootstrap/Button';
import { Game } from '../types/game';

type GameProps = {
  game: Game
};

export const GameSetup = (props : GameProps) => {
  return (<Button variant="primary">Add</Button>);
}