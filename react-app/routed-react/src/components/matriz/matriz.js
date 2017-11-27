import React, { Component } from 'react';
import '../../../node_modules/materialize-css/dist/css/materialize.css'
import './matriz.css'

class Matriz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: {
                Matriz: [],
                Expandidos: [],
                Frontera: [],
                Acumulador: 0
            }
        }
    }
    render() {
        let rows = [];
        for (var i = 0; i < this.props.info.Matriz.length; i++) {
            let rowID = `row${i}`
            let cell = []
            for (var idx = 0; idx < this.props.info.Matriz[i].length; idx++) {
                let cellID = `cell-${i}-${idx}`
                let newCell =
                    <td key={cellID}
                        id={cellID}

                        className={`celda-matriz ${getClassName(this.props.info.Matriz[i][idx])}`}>
                        <Celda nodo={this.props.info.Matriz[i][idx]} />
                        {/* {
                            this.props.info.Matriz[i][idx].gn
                        } */}
                    </td>
                cell.push(newCell)
            }
            rows.push(<tr key={i} id={rowID}>{cell}</tr>)
        }
        return (
            <div>
                <div className="container">
                    <BarraEstatica info={this.props.info} />
                    <table id="matriz">
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }

}

const Celda = props => {
    return (
        <div>
            <span className="node-data">Id: {props.nodo.Id}</span>
            <span className="node-data">G(n): {props.nodo.gn}</span>
            <span className="node-data">H(n): {props.nodo.hn}</span>
            <strong className="node-data">Costo total: {props.nodo.Costo}</strong>
        </div>
    )
}

const BarraEstatica = props => {
    return (
        <div className="barra-informacion">
            <table>
                <tr>
                    <td>
                        <h6 className="texto-infobar">Expandidos: </h6>
                        <CeldaBarra info={props.info.Expandidos} />
                    </td>
                    <td>
                        <h6 className="texto-infobar">Frontera: </h6>
                        <CeldaBarra info={props.info.Frontera} />
                    </td>
                    <td>
                        <h6 className="texto-infobar">Costo total: </h6>
                        <NodoInterno text={props.info.Acumulador} />
                    </td>
                </tr>
            </table>

        </div>
    )
}

const CeldaBarra = props => {
    return (
        <div>
            {
                props.info.map(nodo =>
                    <NodoInterno text={nodo.Id} />
                )
            }
        </div>
    )
}

const NodoInterno = props => {
    return (
        <td className="celda-informacion">
            {props.text}
        </td>
    )
}

const getClassName = nodo => {
    let className = nodo.Visitado ? "yellow " : ""
    className += nodo.Inicio ? "Inicio " : ""
    className += nodo.Final ? "Final " : ""
    className += className === "" ? "green " : ""
    return className
};

export default Matriz;
