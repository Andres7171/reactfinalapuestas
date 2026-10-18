import React, { Component } from "react";
import ServicioApuestas from "../services/ServiceApuestas";
import { NavLink } from "react-router-dom";

export default class Apuestas extends Component {
  
  
  state={
    apuestas:[]
  }

  service= new ServicioApuestas()

  loadApuestas=async()=>{
    try{
        let data=await this.service.getApuestas()
        this.setState({
            apuestas:data
        })
    }catch(error){
        console.log(error.message)
    }
  }

  componentDidMount=async()=>{
    await this.loadApuestas()
  }
  
    render() {
    return (
      <div>
        <h1>Apuestas</h1>
        <button className="btn btn-info">
            <NavLink to='/createapuesta'>Create Apuesta</NavLink>
        </button>
        <table className="table table-primary table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Resultado</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.apuestas.map((apuesta, index) => {
                      return (
                        <tr key={index}>
                          <td>{apuesta.usuario}</td>
                          <td>{apuesta.resultado}</td>
                          <td>{apuesta.fecha}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
      </div>
    );
  }
}
