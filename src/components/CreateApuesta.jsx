import React, { Component } from "react";
import ServicioApuestas from "../services/ServiceApuestas";
import { Navigate } from "react-router-dom";

export default class CreateApuesta extends Component {
  
  cajaUsuario=React.createRef()
  cajaReal=React.createRef()
  cajaAtleti=React.createRef()
  cajaFecha=React.createRef()

  service=new ServicioApuestas()

  state={
    status:false,
    message:''
  }
  createApuesta=async(event)=>{
    event.preventDefault()
    let apuesta={
        idApuesta:2,
        usuario:this.cajaUsuario.current.value,
        resultado:this.cajaReal.current.value+' - '+this.cajaAtleti.current.value,
        fecha:this.cajaFecha.current.value
    }

    try{
        await this.service.createApuesta(apuesta)
        this.setState({
            status:true
        })
    }catch(error){
        this.setState({
            message:error.message
        })
        console.log(error.message)
    }
  }
    render() {
    return (
      <div>
        <h1>CreateApuesta</h1>

        {
            this.state.status &&
            (<Navigate to='/apuestas'/>)
        }
        <h3 style={{color:'blue'}}>{this.state.mensaje}</h3>

        <form action="">
            <label htmlFor="">Usuario</label>
            <input className="form-control" ref={this.cajaUsuario} type="text" />
            <label  htmlFor="">Real Madrid</label>
            <input className="form-control" ref={this.cajaReal} type="text" />
            <label htmlFor="">Atleti</label>
            <input className="form-control" ref={this.cajaAtleti} type="text" />
            <label htmlFor="">Fecha</label>
            <input className="form-control" ref={this.cajaFecha} type="text" />
            <button onClick={this.createApuesta} className="btn btn-info">Create</button>
        </form>
      </div>
    );
  }
}
