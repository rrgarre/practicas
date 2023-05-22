import { useState } from "react"


const Toggable = (props) => {
  
  const [visible, setVisible] = useState(false)
  
  return(
    <>
      {
        !visible
          ? <button onClick={()=>{setVisible(true)}}>{props.buttonLabel}</button>
          : <div>
              {props.children}
              <button onClick={()=>{setVisible(false)}}>cancel</button>
            </div>
      }
    </>
  )
}

export default Toggable