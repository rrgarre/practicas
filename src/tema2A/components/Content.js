import React from 'react'
import Part from './Part'

const Content = ({contenido}) => {
  return (
    <div>
      {contenido.map((valor, i) => <Part key={i} valor={valor}/>)}
    </div>
  )
}

export default Content