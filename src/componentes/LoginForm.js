import {useState} from 'react'

const LoginForm = ({handleSubmit, username, password, setPassword, setUsername}) => {

  const [showForm, setShowForm] = useState(false)

  return(
    !showForm
      ? <button onClick={()=>{setShowForm(true)}}>log in</button>
      : <form onSubmit={handleSubmit}>
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
          <button onClick={()=>{setShowForm(false)}}>cancel</button>
        </form>
  )
}


export default LoginForm