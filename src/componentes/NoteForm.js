import { useState } from "react"
// import noteServices from '../services/notas'

// const NoteForm = ({notes, setNotes, setUser, setErrorMessage}) => {
const NoteForm = ({addNote}) => {

  const [ newNote, setNewNote ] = useState('')

  // Crear una nueva nota
  const submitNote = (e) => {
    e.preventDefault()
    addNote({
      content: newNote,
      important: Math.random()<.5,
    })
    setNewNote('')
  }
  
  return (
    <form onSubmit={submitNote}>
      <input 
        value={newNote}
        onChange={({target})=>setNewNote(target.value)}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm