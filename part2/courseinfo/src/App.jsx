

const CoursePart = ({ name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Course = ({ course: { id, name, parts }}) => {
  return (
    <div>
      <h1>{name}</h1>
      {
        parts.map((part) => {
          return <CoursePart key={part.id} name={part.name} exercises={part.exercises} />
        })
      }
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App