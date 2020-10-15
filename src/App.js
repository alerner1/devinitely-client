import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Button from 'react-bootstrap/Button';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Route path="/" render={() => <Button variant="danger">Bootstrapped!</Button>} />
  );
}

export default App;
