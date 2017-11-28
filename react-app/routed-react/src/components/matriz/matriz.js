import React, { Component } from 'react';
import '../../../node_modules/materialize-css/dist/css/materialize.css'
import './matriz.css'
import $ from 'jquery'

class Matriz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                Matriz: [],
                Expandidos: [],
                Frontera: [],
                Acumulador: 0
            },
        
        }
    }
    // setInicio = Inicio => {
    //     this.setState({ Inicio },() => console.log(this.state.Inicio))
    // }

    // setFinal = Final => this.setState({ Final })

    render() {
        let rows = [];
        for (var i = 0; i < this.props.info.Matriz.length; i++) {
            let rowID = `row${i}`
            let cell = []
            for (var idx = 0; idx < this.props.info.Matriz[i].length; idx++) {
                let cellID = `cell-${this.props.info.Matriz[i][idx].Id}`
                let newCell =
                    <td key={cellID}
                        id={cellID}
                        className={`celda-matriz ${this.props.info.Matriz[i][idx].Color} ${getClassName(this.props.info.Matriz[i][idx])} `}>
                        <Celda nodo={this.props.info.Matriz[i][idx]} setInicio={this.props.setInicio} setFinal={this.props.setFinal} />

                    </td>
                cell.push(newCell)
            }
            rows.push(<tr key={i} id={rowID}>{cell}</tr>)
        }
        return (
            <div className="row">
                <BarraEstatica info={this.props.info} />
                <table id="matriz" className="matriz">
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                {/* <span>{this.state.Inicio.i}</span> */}
            </div>
        )
    }

}

const BotonInicio = ({ handleClick, Inicio }) => {
    return (
        <button id="btn-inicio" className="waves-effect waves-light btn btn-controlador btn-inicio" onClick={() => handleClick(Inicio)}>
            Inicio
        </button>
    )
}

const BotonFinal = ({ handleClick, Final }) => {
    return (
        <button id="btn-final" className="waves-effect waves-light btn btn-controlador btn-final" onClick={() => handleClick(Final)}>
            Final
        </button>
    )
}

const Celda = ({ nodo, setInicio, setFinal }) => {
    return (
        <div>
            <div id="botones" className="botones-inicio-fin">
                <BotonInicio handleClick={setInicio} Inicio={nodo}/>
                <BotonFinal handleClick={setFinal} Final={nodo} />
            </div>
            <div id="informacion">
                <span className="node-data">Id: {nodo.Id}</span>
                <span className="node-data">G(n): {nodo.gn}</span>
                <span className="node-data">H(n): {nodo.hn}</span>
                <span className="node-data">Terreno: {nodo.Terreno}</span>
                <strong className="node-data">Costo total: {nodo.Costo}</strong>
            </div>
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
                        <span className="texto-infobar">{props.info.Acumulador}</span>
                    </td>
                </tr>
            </table>

        </div>
    )
}

const CeldaBarra = props => {
    return (
        props.info.map(nodo =>
            <NodoInterno text={nodo.Id} />
        )
    )
}

const NodoInterno = props => {
    return (
        <td className="celda-informacion" onMouseEnter={() => Hover(props.text)} onMouseLeave={() => unHover(props.text)}>
            <a href={`#cell-${props.text}`}>
                {
                    props.text
                }
            </a>
        </td>
    )
}

const getClassName = nodo => {
    let className = nodo.Visitado ? "no-opaco " : ""
    className += nodo.Inicio ? "Inicio " : ""
    className += nodo.Final ? "Final " : ""
    // className += className === "" ? "green " : ""
    return className
};

const Hover = id => getNodo(id) ? getNodo(id).classList.add("hover") : ""

const unHover = id => getNodo(id) ? getNodo(id).classList.remove("hover") : ""

const getNodo = id => document.querySelector(`#cell-${id}`)

export default Matriz;
