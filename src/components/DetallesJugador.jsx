import React, { Component } from 'react'

export default class DetallesJugador extends Component {
  
  ocultarModalJugador=()=>{
    this.props.cambiarMostrarJugador()
  }
  
    render() {
    return (
      <>
      
        <div
          className="modal"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Informacion de  jugador</h5>
              </div>
              <div className="modal-body">
                <h3>{this.props.jugador.nombre}</h3>
                <img style={{width:'150px',height:'275px'}}  src={this.props.jugador.imagen} alt="" />
                <h4>{this.props.jugador.posicion}</h4>
                <p>{this.props.jugador.fechaNacimiento}</p>
                <p>Pais: {this.props.jugador.pais}</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={this.ocultarModalJugador}
                  type="button"
                  className="btn btn-danger"
                >
                  Volver a jugadores
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
