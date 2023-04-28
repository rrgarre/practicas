import React from 'react'
import Course from './components/Course'

const App = () => {

  const course = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ]
    },
    {
      id: 2,
      name: 'NodeJS',
      parts: [
        {
          name: 'Fundamentals of Node',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Final',
          exercises: 9,
          id: 2,
        },
      ]
    },
  ]

  // return <Course course={course} />
  return course.map(curso => <Course key={curso.id} course={curso}/>)
}

export default App