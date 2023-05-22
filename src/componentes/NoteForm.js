import { useState } from "react"
import noteServices from '../services/notas'

const NoteForm = ({notes, setNotes, setUser, setErrorMessage}) => {

  const [ newNote, setNewNote ] = useState('')

  // Crear una nueva nota
  const addNote = async (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random()<.5,
    }
  
    try {
      const respuesta = await noteServices.create(noteObject)
      console.log('Creando nota: ', respuesta)
      setNewNote('')
      setNotes(notes.concat(respuesta))
    } catch (error) {
      console.log('ERROR desde crear Nota service', error.response.data)
      if(error.response.data.error === 'Token expired. Log again!'){
        window.localStorage.clear()
        setUser(null)
        setErrorMessage('Sesión expirada')
        setTimeout(() => {
          setErrorMessage(null)
          setNewNote('')
        }, 3000);
        return
      }
      setErrorMessage('Nota imposible de crear')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000);
    }
  }

  return (
    <form onSubmit={addNote}>
      <input 
        value={newNote}
        onChange={({target})=>setNewNote(target.value)}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm