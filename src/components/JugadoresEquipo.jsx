import React, { Component } from "react";
import ServiceEquipo from "../services/ServiceEquipo";
import ServiceJugadores from "../services/ServiceJugadores";
import DetallesJugador from "./DetallesJugador";

export default class JugadoresEquipo extends Component {
  service = new ServiceJugadores();
  state = {
    jugadores: [],
    mostrarJugador: false,
    jugadorSeleccionado: null,
  };

  ocultarModal = () => {
    this.props.cambiarMostrarJugadores();
  };

  cambiarMostrarJugador = () => {
    this.setState({
      mostrarJugador: !this.state.mostrarJugador,
    });
  };

  mostrarModalJugador = (jugador) => {
    this.setState({
      mostrarJugador: true,
      jugadorSeleccionado: jugador,
    });
  };

  loadJugadoresEquipo = async () => {
    try {
      let data = await this.service.getJugadoresEquipo(
        this.props.equipo.idEquipo,
      );
      this.setState({
        jugadores: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount = async () => {
    await this.loadJugadoresEquipo();
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
                <h5 className="modal-title">
                  Jugadores del {this.props.equipo.nombre}
                </h5>
              </div>
              <div className="modal-body">
                <button
                  onClick={this.ocultarModal}
                  type="button"
                  className="btn btn-danger"
                >
                  Volver
                </button>
                <table className="table table-primary table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Imagen</th>
                      <th>Detalles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.jugadores.map((jugador, index) => {
                      return (
                        <tr key={index}>
                          <td>{jugador.nombre}</td>
                          <td>
                            <img
                              style={{ width: "60px", height: "60px" }}
                              src={jugador.imagen}
                              alt=""
                            />
                          </td>
                          <td>
                            <button
                              onClick={() => this.mostrarModalJugador(jugador)}
                              className="btn btn-danger"
                            >
                              Detalles
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>

        {this.state.mostrarJugador && (
          <DetallesJugador
            jugador={this.state.jugadorSeleccionado}
            cambiarMostrarJugador={this.cambiarMostrarJugador}
          />
        )}
      </>
    );
  }
}
