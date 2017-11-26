import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import  Matriz  from './components/matriz/matriz.js'

// var Matrix = [
//   [2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, -1, 2],
//   [2, 2, 2, 2, 2, 2],
//   [1, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2],
// ];

var matrix2 = [
[{visitado : false, gn : 2}, {visitado : false, gn : 2},{visitado : false, gn : 2}, {visitado : false, gn : 2}, {visitado : false, gn : 2}, {visitado : false, gn : 2}],
[{visitado : false, gn : 2}, {visitado : false, gn : 2},{visitado : false, gn : 2}, {visitado : false, gn : 2}, {visitado : false, gn : -1, fin : true}, {visitado : false, gn : 2}],
[{visitado : false, gn : 2}, {visitado : false, gn : 2},{visitado : false, gn : 2}, {visitado : false, gn : 2}, {visitado : false, gn : 2}, {visitado : false, gn : 2, final : true}],
[{visitado : false, gn : 1}, {visitado : false, gn : 2, inicio : true},{visitado : true, gn : 2}, {visitado : false, gn : 2}, {visitado : false, gn : 2}, {visitado : true, gn : 2}],
[{visitado : false, gn : 2}, {visitado : false, gn : 2},{visitado : false, gn : 2}, {visitado : true, gn : 2}, {visitado : true, gn : 2}, {visitado : false, gn : 2}],
[{visitado : false, gn : 2}, {visitado : false, gn : 2},{visitado : false, gn : 2}, {visitado : false, gn : 2}, {visitado : false, gn : 2}, {visitado : false, gn : 2}],
];

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Matriz matriz={matrix2}/>
      </div>
    );
  }
}

export default App;
