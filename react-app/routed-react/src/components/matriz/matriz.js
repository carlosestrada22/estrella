import React, { Component } from 'react';
import '../../../node_modules/materialize-css/dist/css/materialize.css'
import './matriz.css'

class Matriz extends Component {

    constructor(props) {
        super(props);
        this.state = { matriz: [] }
    }
    render() {
        let rows = [];
        for (var i = 0; i < this.props.matriz.length; i++) {
            let rowID = `row${i}`
            let cell = []
            for (var idx = 0; idx < this.props.matriz[i].length; idx++) {
                let cellID = `cell-${i}-${idx}`
                let newCell = <td key={cellID} id={cellID} onClick={() => {setListenners(cellID)}} className={`celda-matriz ${getClassName(this.props.matriz[i][idx])}`}>{this.props.matriz[i][idx].gn}</td>
                cell.push(newCell)
            }
            rows.push(<tr key={i} id={rowID}>{cell}</tr>)
        }
        return (
            <div className="container">

                <table id="matriz">
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }

}
const setListenners = Id => {
    let nodo = document.getElementById(Id)

    nodo.addEventListener('click', () => {
      
      setTimeout(() => {
          nodo.focus()
      }, 0);
    })
};

const getClassName = nodo => {
    let className = nodo.visitado ? "yellow " : ""
    className += nodo.inicio ? "inicio " : ""
    className += nodo.final ? "final " : ""
    className += className === "" ? "green " : ""
    return className
};

export default Matriz;
