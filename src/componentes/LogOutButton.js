const desLogHandle = (setUser) => {
  // alert('deslogeando')
  window.localStorage.clear()
  setUser(null)
}

const LogOutButton = ({name, setUser}) => {
  return(
    <button onClick={()=>{desLogHandle(setUser)}}>{name}: logOut</button>
  )
}

export default LogOutButton