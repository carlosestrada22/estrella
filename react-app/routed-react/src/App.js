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
      mat: [[]],
      info: {
        Matriz: [[]],
        Expandidos: [],
        Frontera: [],
        Acumulador: 0
    }
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/matriz`)
      .then(res => {
        const mat = res.data.Matriz;
        const info =
          res.data
          ;
        console.log(res.data)
        this.setState({ info });
      });

  }

  render() {
    return (
      <div className="App">
        <Matriz info={this.state.info} />
      </div>
    );
  }
}

export default App;
