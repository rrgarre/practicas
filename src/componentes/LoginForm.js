

const LoginForm = ({handleSubmit, username, password, setPassword, setUsername}) => {
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