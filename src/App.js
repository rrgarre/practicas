import React, {useEffect, useState} from 'react'
// import axios from 'axios'
import Nota from './componentes/Nota'
// serviio con la logica para las peticiones http
import noteServices from './services/notas'
import loginServices from './services/login'
import Notification from './componentes/Notification'
import Footer from './componentes/Footer'
import NoteForm from './componentes/NoteForm'
import LoginForm from './componentes/LoginForm'

const App = () => {

  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage] = useState(null)

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ]= useState(null)

  useEffect(()=>{
    noteServices.getAll().then((respuesta) => {
      console.log(respuesta)
      setNotes(respuesta)
    })
  }, [])

  const notesToShow = showAll 
    ? notes 
    : notes.filter(nota => nota.important)

  // Manejo de Submit de formulario de LOGIN
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userReturned = await loginServices.login({username, password})
      noteServices.setNewToken(userReturned.token)
      setUser(userReturned)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials!!!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000);
    }
  }
  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  // Crear una nueva nota
  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      // id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random()<.5,
    }
    noteServices.create(noteObject, user.token).then(respuesta => {
      setNotes(notes.concat(respuesta))
      setNewNote('')
    })
  }

  // Modificar la importancia de una nota
  const toggleImportanceOf = (id) => {
    console.log(`modificar importancia de la nota: ${id}`)
    // encontramos y copiamos la nota en la lista de notas
    const noteToChange = notes.find(n => {
      return n.id===id
    })
    
    // creamos la nota modificada a partir de la nota copiada
    // noteChanged es una copia modificada de noteToChange
    // Ya que la anterior es una referencia a un componente del array de ESTADO
    const noteChanged = {...noteToChange, important: !noteToChange.important}
    
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

      {
        // !user && loginForm()
        // user && noteForm()
        user === null
          ? <LoginForm
              handleSubmit={handleSubmit}
              username={username}
              password={password}
              setPassword={setPassword}
              setUsername={setUsername}
            />
          : <div>
              <p>{user.name} logged-in</p>
              <NoteForm
                addNote={addNote}
                newNote={newNote}
                setNewNote={setNewNote}
              />
            </div>  
      } 
    
      <button onClick={()=>setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
      {
        notesToShow.map((note) => {
            return <Nota key={note.id} note={note} toggleImp={() => toggleImportanceOf(note.id)}/>
          }
        )
      }
      </ul>
      <Footer/>
    </div>
  )
}

export default App