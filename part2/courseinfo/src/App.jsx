

const CoursePart = ({ name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Course = ({ course: { id, name, parts }}) => {
  const totalNumberOfExercises = parts.reduce((acc, curr) => {
    return acc + curr.exercises
  }, 0)

  return (
    <div>
      <h1>{name}</h1>
      {
        parts.map((part) => {
          return <CoursePart key={part.id} name={part.name} exercises={part.exercises} />
        })
      }
      <p><strong>total of {totalNumberOfExercises} exercises</strong></p>
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App