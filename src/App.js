import React, {useEffect, useState} from 'react'
// import axios from 'axios'
import Nota from './componentes/Nota'
// serviio con la logica para las peticiones http
import noteServices from './services/notas'
import Notification from './componentes/Notification'
import Footer from './componentes/Footer'

const App = () => {

  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage] = useState(null)

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  useEffect(()=>{
    noteServices.getAll().then((respuesta) => {
      console.log(respuesta)
      setNotes(respuesta)
    })
  }, [])

  const notesToShow = showAll 
    ? notes 
    : notes.filter(nota => nota.important)


  const handeSubmit = (event) => {
    event.preventDefault()
    console.log(`Usuario: ${event.target[0].value}`)
    console.log(`Password: ${event.target[1].value}`)
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const addNote = (e) => {

    e.preventDefault()
    const noteObject = {
      // id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random()<.5,
    }

    noteServices.create(noteObject).then(respuesta => {
      setNotes(notes.concat(respuesta))
      setNewNote('')
    })

  }

  const toggleImportanceOf = (id) => {
    console.log(`modificar importancia de la nota: ${id}`)
    // encontramos y copiamos la nota en la lista de notas
    const noteToChange = notes.find(n => {
      // console.log('id de nota: ', n.id)
      // console.log('id request: ', id)
      // n.id === id
      //   ? console.log('COINCIDE')
      //   : console.log('ERROR')
      return n.id===id
    })
    // console.log('NOTE to change: ', noteToChange)
    
    // creamos la nota modificada a partir de la nota copiada
    // noteChanged es una copia modificada de noteToChange
    // Ya que la anterior es una referencia a un componente del array de ESTADO
    const noteChanged = {...noteToChange, important: !noteToChange.important}
    // console.log('nota cambiada', noteChanged)
    
    // Tras el PUT, hacemo el setNotes con un MAP de notes
    // Si la id de cada nota es diferente de la ID de parametro, la nota se queda
    // En caso contrario, ponemos la nota recibida como respuesta del servidor tras el PUT
    // ADEMAS capturamos algun posible error con .catch() y filtramos las notas del estado "notes"
    noteServices
      .update(id, noteChanged)
      .then(respuesta => {
        setNotes(notes.map(note => note.id !== id? note : respuesta))
      })
      .catch(error=>{
        // alert(`La nota "${noteToChange.content}" no ya no se encuentra en el servidor`)
        setErrorMessage(`La nota '${noteToChange.content}' ya no existe`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n=>n.id !== id))
      })
  }


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <form onSubmit={handeSubmit}>
        <div>
          Nombre de usuario
          <input
            type='text'
            value={username}
            onChange={({target})=>{setUsername(target.value)}}
            name='Username'
          />
        </div>
        <div>
          Contraseña
          <input
            type='password'
            value={password}
            onChange={({target})=>{setPassword(target.value)}}
            name='Password'
          />
        </div>
        <button type='submit'>login</button>


      </form>

      <button onClick={()=>setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
      {
        notesToShow.map((note) => {
            // console.log(note._id)
            return <Nota key={note.id} note={note} toggleImp={() => toggleImportanceOf(note.id)}/>
          }
        )
      }
      </ul>

      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
      <Footer/>
    </div>
  )
}

export default App