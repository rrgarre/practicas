/** Component for:   ***************

************************************/
import React from 'react'

const Total = ({contenido}) => {
  let totalCursos = 0

  const ejercicios = contenido.map(valor=>valor.exercises)
  totalCursos = ejercicios.reduce((a, b) => a+b)
  
  return (
    <b>total of {totalCursos} courses</b>
  )
}

export default Total