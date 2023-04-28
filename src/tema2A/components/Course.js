import React from "react"
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
  return (
    <div>
      <Header titulo={course.name}/>
      <Content contenido={course.parts}/>
      <Total contenido={course.parts}/>
    </div>
  )
}

export default Course