import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'

/////////////////////////////////////////////////////////////
// Componentes auxiliares
const Boton = ({manejadorClick, texto})=>{
  return(
    <button onClick={manejadorClick}>{texto}</button>
  )
}

const Estadistica = ({texto, dato}) => <p>{texto}: {dato}</p> 

const Estadisticas = ({buenas, normales, malas})=>{
  const total = buenas+normales+malas
  const promedio = (buenas-malas)/total
  const positivos = buenas*100/total
  if(total==0) 
    return <p>No existe ningún comentario</p>
  return (
    <div>
      <Estadistica texto='Buenas' dato={buenas}/>  
      <Estadistica texto='Normales' dato={normales}/> 
      <Estadistica texto='Malas' dato={malas}/>
      <hr></hr> 
      <Estadistica texto='Total' dato={total}/> 
      <Estadistica texto='promedio' dato={promedio}/> 
      <Estadistica texto='positivos' dato={positivos}/>    
    </div>
  )
}
// Componente principal
const App = () => {
 
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>Aquí sus comentarios</h1>
      <Boton manejadorClick={()=>setGood(good+1)} texto='bueno'/>
      <Boton manejadorClick={()=>setNeutral(neutral+1)} texto='normal'/>
      <Boton manejadorClick={()=>setBad(bad+1)} texto='malo'/>
      <h2>Estadisticas</h2>
      <Estadisticas buenas={good} normales={neutral} malas={bad}/>
    </div>
  )
}
/////////////////////////////////////////////////////////////

ReactDOM.render(<App />, document.getElementById('root')
)