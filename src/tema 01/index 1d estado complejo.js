import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '../src/index.css'

/////////////////////////////////////////////////////////////

const App = () => {
  // Estado basado en una estructura (mas compleja) de datos
  // Suele ser mejor estados separados
  const [clicks, setClicks] = useState({left: 0, right: 0})

  // Para cambiar estados siempre se pasará un objeto completo fabriado
  // aunque se una copia (...clicks) con un campo modificado
  const handleLeftlick = ()=> 
    setClicks({...clicks, left: clicks.left+1})
  const handleRightlick = ()=>
    setClicks({...clicks, right: clicks.right+1})

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftlick}>
        left
      </button>
      <button onClick={handleRightlick}>
        right
      </button>
      {clicks.right}
    </div>
  )
}
/////////////////////////////////////////////////////////////

ReactDOM.render(<App />, document.getElementById('root')
)