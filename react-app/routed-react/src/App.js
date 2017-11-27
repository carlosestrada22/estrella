import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Matriz from './components/matriz/matriz.js'
import axios from 'axios'

// var Matrix = [
//   [2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, -1, 2],
//   [2, 2, 2, 2, 2, 2],
//   [1, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2],
//   [2, 2, 2, 2, 2, 2],
// ];

var matrix2 = [
  [{ Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }],
  [{ Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: -1 }, { Visitado: false, gn: 2 }],
  [{ Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2, Final: true }],
  [{ Visitado: false, gn: 1 }, { Visitado: false, gn: 2, Inicio: true }, { Visitado: true, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: true, gn: 2 }],
  [{ Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: true, gn: 2 }, { Visitado: true, gn: 2 }, { Visitado: false, gn: 2 }],
  [{ Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }, { Visitado: false, gn: 2 }],
];

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mat: [[]]
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/matriz`)
    .then(res => {
      const mat = res.data;
      console.log(mat)
      this.setState({ mat });
    });

  }

  render() {
    return (
      <div className="App">
        <Matriz matriz={this.state.mat} />
      </div>
    );
  }
}

export default App;
