const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Course = ({course}) => {
  return <div>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={course.parts.reduce((prev,current)=>prev+current.exercises,0)}/>
  </div>
}

const Part = ({ partName,partExercise }) => 
  <p>
    {partName} {partExercise}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(item=><Part key={item.id} partName={item.name} partExercise={item.exercises}/>)}
  </>

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <div>
    <h1>Web Development Curriculum</h1>
    <Course course={courses[0]} />
    <Course course={courses[1]} />
  </div>
}

export default App