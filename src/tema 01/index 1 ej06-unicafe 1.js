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
const Estadistias = ({buenas, normales, malas})=>{
  return (
    <div>
      <p>Buenas: {buenas}</p>
      <p>Normales: {normales}</p>
      <p>Malas: {malas}</p>
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
      <Estadistias buenas={good} normales={neutral} malas={bad}/>
    </div>
  )
}
/////////////////////////////////////////////////////////////

ReactDOM.render(<App />, document.getElementById('root')
)