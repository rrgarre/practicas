import React from 'react'

const Nota = ({note, toggleImp})=>{

  // console.table(note)
  const label = note.important
    ? 'hacer no importante'
    : 'hacer importante'
  return (
    <li>
      {note.content}
      <button onClick={toggleImp}>{label}</button>
    </li>
  )

}

export default Nota