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

export default Course