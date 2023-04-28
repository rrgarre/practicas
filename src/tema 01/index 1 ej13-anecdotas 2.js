import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'

/////////////////////////////////////////////////////////////
// Componentes auxiliares
const Boton = ({handleClick, texto}) => {
  return(
    <p>
      <button onClick={handleClick}>{texto}</button>
    </p>
  )
}
const Visor = ({votos})=>votos==0? '' : <p>tiene {votos} votos</p>

// Componente principal
const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)  
  const [puntuaciones, setPuntuaciones] = useState(Array(anecdotes.length).fill(0))

  //FUNION GENERAR NUEVA CITA
  const nuevaCita = () => {
    let numero = 0
    do {
      numero = Math.floor(Math.random()*anecdotes.length)
      console.log('iteracion: estado=' + selected + ' numero=' + numero)
    } while (numero == selected)
    setSelected(numero)
  }
  // FUNCION VOTAR
  const votar = ()=>{
    const copiaPuntuaciones = [...puntuaciones]
    copiaPuntuaciones[selected]+=1
    setPuntuaciones(copiaPuntuaciones)
    console.log(puntuaciones)
  }

  return (
    <div>
      <div class='visor'>
        <b>"{anecdotes[selected]}"</b>
        <Visor votos={puntuaciones[selected]}/>
      </div>
      <Boton handleClick={nuevaCita} texto='Siguiente cita'/>
      <Boton handleClick={votar} texto='votar'/>
    </div>
  )
}
/////////////////////////////////////////////////////////////

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'The best way to get a project done faster is to start sooner'
]

// ReactDOM.render(
//   <App anecdotes={anecdotes} />,
//   document.getElementById('root')
// )
ReactDOM.render(
  <App anecdotes={anecdotes}/>, document.getElementById('root')
)