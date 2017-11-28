import React, { Component } from 'react';
import '../../../node_modules/materialize-css/dist/css/materialize.css'
//import './refresh-button.css'

class RefreshButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <a onClick={() => this.props.refrescar()} className="waves-effect waves-light btn">Refresh</a>
        )
    }
}
const clickeado = () => {
    console.log("clicked")
}
export default RefreshButton