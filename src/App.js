import React, {useEffect, useState} from 'react'
import Nota from './componentes/Nota'
// servicio con la logica para las peticiones http
import noteServices from './services/notas'
import loginServices from './services/login'
import Notification from './componentes/Notification'
import Footer from './componentes/Footer'
import LogOutButton from './componentes/LogOutButton'
import NoteForm from './componentes/NoteForm'
import LoginForm from './componentes/LoginForm'
import Toggable from './componentes/Togglable'

const App = () => {

  const [ notes, setNotes ] = useState([])
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage] = useState(null)

  const [ user, setUser ]= useState(null)

  useEffect(()=>{
    noteServices.getAll().then((respuesta) => {
      console.log(respuesta)
      setNotes(respuesta)
    })
  }, [])
  useEffect(()=>{
    const userLoggedJSON = window.localStorage.getItem('userLogged')
    if(userLoggedJSON){
      const userLogged = JSON.parse(userLoggedJSON)
      loginServices.validToken(userLogged.token).then((response)=>{
        console.log('RESPUESTA: ', response.status)
        setUser(userLogged)
        noteServices.setNewToken(userLogged.token)
      }).catch(error=>{
        console.log('RESPUESTA: ', error.response.status)
        window.localStorage.clear()
        setUser(null)
      })
    }
  }, [])

  const notesToShow = showAll 
    ? notes 
    : notes.filter(nota => nota.important)


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
        user === null
          ? <Toggable buttonLabel={'show login'}>
              <LoginForm
                setUser={setUser}
                setErrorMessage={setErrorMessage}
              />
            </Toggable> 
          : <div>
              <LogOutButton name={user.name} setUser={setUser}/>
              <NoteForm
                notes={notes}
                setNotes={setNotes}
                setUser={setUser}
                setErrorMessage={setErrorMessage}
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