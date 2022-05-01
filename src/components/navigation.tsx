import React from 'react';
import { Button, Navbar } from 'react-bootstrap';

type NavigationProps = {
  showButtons : boolean;
  onNewGame : () => void;
  onResetScore : () => void;
}

export const Navigation = (props : NavigationProps) : JSX.Element => {
  return (<Navbar bg="light" >
    <Navbar.Brand>{process.env.REACT_APP_NAME}<sub>v{process.env.REACT_APP_VERSION}</sub></Navbar.Brand>
    {props.showButtons && 
      <>
        <Button size="sm" variant="danger" onClick={props.onNewGame}>New</Button>
        &nbsp;
        <Button size="sm" variant="danger" onClick={props.onResetScore}>Reset</Button>
      </>
    }
  </Navbar>);
}