import React from 'react'

const Part = ({valor}) => {
  
  return (
    <p>{valor.name} {valor.exercises}</p>
  )
}

export default Part