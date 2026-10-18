import React, { Component } from "react";
import ServiceEquipo from "../services/ServiceEquipo";
import JugadoresEquipo from "./JugadoresEquipo";

export default class DetallesEquipo extends Component {
  service = new ServiceEquipo();
  state = {
    equipo: null,
    mostrarJugadores: false,
  };

  searchEquipo = async () => {
    try {
      let data = await this.service.getEquipoID(this.props.equipo.idEquipo);
      this.setState({
        equipo: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  ocultarModalEquipo = () => {
    this.props.cambiarMostrarEquipo();
    this.props.loadEquipos();
  };

  cambiarMostrarJugadores = () => {
    this.setState({
      mostrarJugadores: !this.state.mostrarJugadores,
    });
  };

  mostrarModalJugadores = () => {
    this.setState({
      mostrarJugadores: true,
    });
  };

  componentDidMount = async () => {
    await this.searchEquipo();
  };

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
                <h5 className="modal-title">Eliminar Departamento</h5>
              </div>
              <div className="modal-body">
                <h3>{this.props.equipo.nombre}</h3>
                <img style={{width:'150px',height:'275px'}}  src={this.props.equipo.imagen} alt="" />
                <h4>{this.props.equipo.champions}</h4>
                <p>{this.props.equipo.descripcion}</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={this.mostrarModalJugadores}
                  type="button"
                  className="btn btn-secondary"
                >
                  Jugadores
                </button>
                <button
                  onClick={this.ocultarModalEquipo}
                  type="button"
                  className="btn btn-danger"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
        {
            this.state.mostrarJugadores &&
            (<JugadoresEquipo  equipo={this.state.equipo} cambiarMostrarJugadores={this.cambiarMostrarJugadores}/>)
        }
      </>
    );
  }
}
