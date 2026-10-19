import React, { Component } from "react";
import ServiceEquipo from "../services/ServiceEquipo";
import Jugadores from "./Jugadores";

export default class Buscador extends Component {
  service = new ServiceEquipo();
  selectEquipo = React.createRef();
  cajaNombre = React.createRef();

  state = {
    equipos: [],
    idequipo: null,
    nombre: null,
  };

  loadEquipos = async () => {
    try {
      let datos = await this.service.getEquipos();
      this.setState({
        equipos: datos,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  buscarPorEquipo = (event) => {
    event.preventDefault();
    this.setState({
      idequipo: this.selectEquipo.current.value,
      nombre: null,
    });
  };

  buscarPorNombre = (event) => {
    event.preventDefault();
    this.setState({
      nombre: this.cajaNombre.current.value,
      idequipo: null,
    });
  };

  componentDidMount = async () => {
    await this.loadEquipos();
  };

  render() {
    return (
      <div>
        <h1>Buscador de jugadores</h1>
        <form>
          <label htmlFor="">Equipo</label>
          <select className="form-select" ref={this.selectEquipo}>
            {this.state.equipos.map((equipo, index) => {
              return (
                <option key={index} value={equipo.idEquipo}>
                  {equipo.nombre}
                </option>
              );
            })}
          </select>
          <button onClick={this.buscarPorEquipo} className="btn btn-info">
            Buscar por equipo
          </button>
        </form>
        <form>
          <label htmlFor="">Nombre</label>
          <input className="form-control" ref={this.cajaNombre} type="text" />
          <button onClick={this.buscarPorNombre} className="btn btn-info">
            Buscar por nombre
          </button>
        </form>

        {this.state.idequipo && <Jugadores idequipo={this.state.idequipo} />}
        {this.state.nombre && <Jugadores nombre={this.state.nombre} />}
      </div>
    );
  }
}
