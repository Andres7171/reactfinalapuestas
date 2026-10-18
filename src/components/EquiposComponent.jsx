import React, { Component } from "react";
import ServiceEquipo from "../services/ServiceEquipo";
import DetallesEquipo from "./DetallesEquipo";
export default class EquiposComponent extends Component {
  service = new ServiceEquipo();
  state = {
    equipos: [],
    mostrarEquipo: false,
    equipoSeleccionado:null
  };

  cambiarMostrarEquipo=()=>{
    this.setState({
        mostrarEquipo:!this.state.mostrarEquipo
    })
  }

  mostrarModalEquipo=(equipo)=>{
    this.setState({
        mostrarEquipo:true,
        equipoSeleccionado:equipo
    })
  }

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
  componentDidMount = async () => {
    await this.loadEquipos();
  };

  render() {
    return (
      <>
      {
        this.state.mostrarEquipo &&
        (<DetallesEquipo loadEquipos={this.loadEquipos} equipo={this.state.equipoSeleccionado} cambiarMostrarEquipo={this.cambiarMostrarEquipo}/>)
      }
        <ul>
          {this.state.equipos.map((equipo, index) => {
            return (
              <li key={index}>
                <h4>{equipo.nombre}</h4>
                <button onClick={()=>this.mostrarModalEquipo(equipo)} className="btn btn-info">Ver Detalles</button>
              </li>
            );
          })}
        </ul>

        {}
      </>
    );
  }
}
