import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenuComponent from './MenuComponent'
import EquiposComponent from './EquiposComponent'
import Apuestas from './Apuestas'
import CreateApuesta from './CreateApuesta'
import Buscador from './Buscador'

export default class Router extends Component {
  render() {
    
    return (
      <BrowserRouter>
      <MenuComponent/>
        <Routes>
            <Route path='/' element={<EquiposComponent/>}/>
            <Route path='/apuestas' element={<Apuestas/>}/>
            <Route path='/createapuesta' element={<CreateApuesta/>}/>
            <Route path='/buscador' element={<Buscador/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
