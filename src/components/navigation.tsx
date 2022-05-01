import React from 'react';
import { Button, Navbar } from 'react-bootstrap';

type NavigationProps = {
  showButtons : boolean;
  onNewGame : () => void;
  onResetScore : () => void;
}

export const Navigation = (props : NavigationProps) : JSX.Element => {
  return (<Navbar bg="light" >
    <Navbar.Brand>{process.env.REACT_APP_NAME}</Navbar.Brand>
    {props.showButtons && 
      <>
        <Button size="sm" variant="danger" onClick={props.onNewGame}>New Game</Button>
        &nbsp;
        <Button size="sm" variant="danger" onClick={props.onResetScore}>Reset Score</Button>
      </>
    }
  </Navbar>);
}