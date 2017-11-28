import React, { Component } from 'react';
import './App.css';
import Matriz from './components/matriz/matriz.js'
import RefreshButton from './components/refresh-button/refresh-button.js'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // mat: [[]],
      info: {
        Matriz: [[]],
        Expandidos: [],
        Frontera: [],
        Acumulador: 0
      }
    }
  }

  refresh(size) {
    !size ? size = 6 : ""
    axios.get(`http://localhost:3001/api/matriz?random=1&size=${size}`)
      .then(res => {
        const info = res.data
        this.setState({ info })
      });
  }

  loadFile(ev) {
    console.log(ev)
    let reader = new FileReader();
    let row = []
    let matrix = []
    reader.onload = () => {
      let text = reader.result.split('\n');
      text.forEach(element => {
        element.split(' ').forEach(sub => {
          row.push(parseInt(sub))
        })
        matrix.push(row)
        row = []
      });
      axios.post(`http://localhost:3001/api/matriz?size=${matrix.length}`, {
        Matriz: matrix
      })
        .then(res => {
          const info = res.data
          this.setState({ info })
        })
    };
    reader.readAsText(ev.files[0])

  }
  componentDidMount() {
    this.refresh()
  }

  getSize() {
    return document.querySelector(`#matriz-size-input`).value
  }

  render() {
    return (
      <div className="App">
        <div className="control-panel">
          <div id="generador">
            <input placeholder="Tamaño de la nueva matriz" id="matriz-size-input" type="number" class="validate" required />
            <label>Genera una nueva matriz random(default tamaño: 6)</label>
            <button type="submit" action="" onClick={() => this.refresh(this.getSize())} className="waves-effect waves-light btn refresh-btn">Generar</button>
          </div>
          <div id="cargador" className="cargador">
            <label>Cargar archivo de texto:</label>
            <input type='file' accept='text/plain' onChange={event => this.loadFile(event.target)} />
          </div>
        </div>
        <Matriz info={this.state.info} />

      </div>
    );
  }
}


export default App;
