import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'

/////////////////////////////////////////////////////////////

const App = () => {
  const [contador, setContador] = useState(0)
  
  const incrementar = () => setContador(contador+1)
  const decrementar = () => setContador(contador-1)
  const resetContador = () => setContador(0)

  const Visor = ({numero}) => {
    return (
      <div class='visor'>
        <p>{numero}</p>
        <p>{numero%2===0 ? 'es par' : 'es impar'}</p>
      </div>
    )
  }
  const Boton = ({handleClick, texto})=>{
    return (
      <button name='sumar' onClick={handleClick}>
        {texto}
      </button>
    )
  }

  return (
    <div>
      <Visor numero={contador}/>
      <Boton handleClick={incrementar} texto='suma (+)'/>
      <Boton handleClick={decrementar} texto='resta (-)'/>
      <Boton handleClick={resetContador} texto='reset 0'/>
    </div>
  )
}
/////////////////////////////////////////////////////////////

ReactDOM.render(<App />, document.getElementById('root')
)