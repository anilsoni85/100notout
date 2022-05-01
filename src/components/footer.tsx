import React from 'react';
import { Navbar } from 'react-bootstrap';
export const Footer = () => {
  return (<Navbar bg="light" fixed="bottom">
  <label>{`App: ${process.env.REACT_APP_NAME} Version: ${process.env.REACT_APP_VERSION}`}</label>
  </Navbar>);
}