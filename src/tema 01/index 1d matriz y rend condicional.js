import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'

/////////////////////////////////////////////////////////////
// Componentes auxiliares
const History = ({historial}) => {
  if(historial.length==0){
    return (
      <div>  
        <p>
          Utiliza los botones
        </p>
      </div>
    )
  }
  return (
    <div>  
      <p>
        Historial: {historial.join(' ')}
      </p>
    </div>
  )
  
}
const Boton = ({handleClick, texto})=>{
  return (
    <button onClick={handleClick}>{texto}</button>
  )
}

// Componente principal
const App = () => {
 
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = ()=>{
    setAll(allClicks.concat('L'))
    setLeft(left+1)
  } 
  const handleRightClick = ()=>{
    setAll(allClicks.concat('R'))
    setRight(right+1)
  } 
    
  // console.log(allClicks.join(' '))
  return (
    <div class='visor' id='panel'>
      {left}
      <Boton handleClick={handleLeftClick} texto={'izq'}/>
      <Boton handleClick={handleRightClick} texto={'dch'}/>
      {right}
      <History historial={allClicks}/>
    </div>
  )
}
/////////////////////////////////////////////////////////////

ReactDOM.render(<App />, document.getElementById('root')
)