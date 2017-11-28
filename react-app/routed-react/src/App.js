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
      },
      Inicio: {},
      Final: {}
    }
  }
  setInicio = Inicio => {
    this.setState({ Inicio }, () => console.log(this.state.Inicio))
  }

  setFinal = Final => this.setState({ Final })


  refresh(size) {
    !size ? size = 6 : ""
    axios.get(`http://${window.location.hostname}:3001/api/matriz?random=1&size=${size}`)
      .then(res => {
        const info = res.data
        this.setState({ info })
      });
  }
  cargarMatriz(matrix, Inicio = null, Final = null ) {
    axios.post(`http://${window.location.hostname}:3001/api/matriz?size=${matrix.length}`, {
      Matriz: matrix,
      Inicio: Inicio,
      Final: Final
    })
      .then(res => {
        const info = res.data
        this.setState({ info })
      })
  }

  loadFile(ev) {
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
      this.cargarMatriz(matrix)
    };
    reader.readAsText(ev.files[0])
  }
  componentDidMount = () => this.refresh()

  getSize = () => document.querySelector(`#matriz-size-input`).value

  ConInicioFin = () => {
    this.cargarMatriz(this.state.info.Matriz, this.state.Inicio, this.state.Final)
  }

  isIniciofin = () =>{
    return this.state.Inicio && this.state.Final
  }

  render() {
    return (
      <div className="App">
        <div className="control-panel row">
          <div id="generador" className="col s4">
            <input placeholder="Tamaño de la nueva matriz" id="matriz-size-input" type="number" className="validate" required />
            <label>Genera una nueva matriz random(default tamaño: 6)</label>
            <button type="submit" action="" onClick={() => this.refresh(this.getSize())} className="waves-effect waves-light btn refresh-btn">Generar</button>
          </div>
          <div id="cargador" className="cargador  col s4">
            <label>Cargar archivo de texto:</label>
            <input type='file' accept='text/plain' onChange={event => this.loadFile(event.target)} className="waves-effect waves-light btn" />
          </div>
          <div id="nodos-inicio-fin" className="cargador col s4">
            <div className="col s6">
              <div className="row">
                <div className="col s6"><label>Nodo inicio:  </label></div>
                <div className="col s6"><span>{`${this.state.Inicio.Id}`} </span></div>
              </div>
              <div className="row">
                <div className="col s6"><label>Nodo Final:  </label></div>
                <div className="col s6"><span>{`${this.state.Final.Id}`} </span></div>
              </div>
            </div>
            <div className="col s6">
              <button id="cargar-inicio-fin" onClick={() => this.ConInicioFin()} className="waves-effect waves-light btn" >Cargar inicio y fin</button>
            </div>
          </div>
        </div>
        <div className="row">
          <Matriz info={this.state.info} setInicio={this.setInicio} setFinal={this.setFinal} />
        </div>
      </div >
    );
  }
}


export default App;
