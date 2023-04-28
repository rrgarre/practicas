import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'

/////////////////////////////////////////////////////////////
// Componentes auxiliares
const Boton = ({handleClick}) => {
  return(
    <p>
      <button onClick={handleClick}>Siguiente cita</button>
    </p>
  )
}

// Componente principal
const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)  
  // const numero = Math.floor(Math.random()*anecdotes.length)

  const nuevaCita = () => {
    let numero = 0
    do {
      numero = Math.floor(Math.random()*anecdotes.length)
      console.log('iteracion: estado=' + selected + ' numero=' + numero)
    } while (numero == selected)
    setSelected(numero)
  }

  return (
    <div>
      {anecdotes[selected]}
      {/* <Boton handleClick={()=>setSelected(Math.floor(Math.random()*anecdotes.length))}/> */}
      <Boton handleClick={nuevaCita}/>
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