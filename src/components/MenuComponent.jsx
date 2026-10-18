import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ServiceEquipo from "../services/ServiceEquipo";
import DetallesEquipo from "./DetallesEquipo";
export default class MenuComponent extends Component {
  service=new ServiceEquipo
  selectEquipos=React.createRef()
  state={
    equipos:[],
    mostrarEquipo:false,
    equipoSeleccionado:null
  }

  cambiarMostrarEquipo=()=>{
    this.setState({
        mostrarEquipo:!this.state.mostrarEquipo
    })
  }

  mostrarModalEquipo=(equipo)=>{
    this.setState({
        equipos:[],
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
      <div>
        <h1>Menu Component</h1>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/apuestas">
                    Apuestas
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Equipos
                  </a>
                  <ul className="dropdown-menu">
                    {
                        this.state.equipos.map((equipo,index)=>{
                            return(
                                <li  onClick={()=>this.mostrarModalEquipo(equipo)} className="dropdown-item"   key={index}>
                                    {equipo.nombre}
                                </li>
                            )
                        })
                    }
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true">
                    Disabled
                  </a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
        {
            this.state.mostrarEquipo &&
            (<DetallesEquipo loadEquipos={this.loadEquipos} equipo={this.state.equipoSeleccionado} cambiarMostrarEquipo={this.cambiarMostrarEquipo} />)
        }
      </div>
    );
  }
}
