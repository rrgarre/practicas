import { useState } from "react"
import loginServices from '../services/login'
import noteServices from '../services/notas'

// const LoginForm = ({handleSubmit, username, password, setPassword, setUsername}) => {
const LoginForm = ({setUser, setErrorMessage}) => {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  // Manejo de Submit de formulario de LOGIN
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userReturned = await loginServices.login({username, password})
      window.localStorage.setItem('userLogged', JSON.stringify(userReturned))
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

  return(
    <form onSubmit={handleSubmit}>
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
  )
}


export default LoginForm