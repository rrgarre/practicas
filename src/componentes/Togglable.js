import { useState, forwardRef, useImperativeHandle } from "react"


const Toggable = forwardRef((props, refs) => {
  
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, ()=>{
    return {
      toggleVisibility
    }
  })
  
  return(
    <div>
      {
        !visible
          ? <button onClick={()=>{setVisible(true)}}>{props.buttonLabel}</button>
            
          : <>
              {props.children}
              <button onClick={()=>{setVisible(false)}}>cancel</button>
            </>
      }
    </div>
  )
})

export default Toggable