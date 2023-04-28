/** Component for:   ***************
Renderizar errores en caso de existir
************************************/
import React from 'react'

const Notification = ({message}) => {
  
  if(message===null){
    return
  }
  return (
    <div className='error'>
      <p>ERROR: {message}</p>
    </div>
  )
}

export default Notification