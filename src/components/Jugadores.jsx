import React, { Component } from "react";
import ServiceJugadores from "../services/ServiceJugadores";

export default class Jugadores extends Component {
  service = new ServiceJugadores();
  state = {
    jugadores: [],
  };

  buscarPorEquipo = async (idequipo) => {
    try {
      let data = await this.service.getJugadoresEquipo(idequipo);
      this.setState({
        jugadores: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  buscarPorNombre = async (nombre) => {
    try {
      let data = await this.service.findJugadores(nombre);
      this.setState({
        jugadores: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Mira qué prop opcional ha llegado y busca según eso
  cargarJugadores = async () => {
    if (this.props.idequipo) {
      await this.buscarPorEquipo(this.props.idequipo);
    } else if (this.props.nombre) {
      await this.buscarPorNombre(this.props.nombre);
    }
  };

  componentDidMount = async () => {
    await this.cargarJugadores();
  };

  // El Mount solo se ejecuta una vez: si cambia el filtro, volvemos a buscar
  componentDidUpdate = async (oldProps) => {
    if (
      oldProps.idequipo !== this.props.idequipo ||
      oldProps.nombre !== this.props.nombre
    ) {
      await this.cargarJugadores();
    }
  };

  render() {
    return (
      <div>
        <h2>Jugadores</h2>
        <table className="table table-primary table-striped table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Posición</th>
              <th>País</th>
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
                  <td>{jugador.posicion}</td>
                  <td>{jugador.pais}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
