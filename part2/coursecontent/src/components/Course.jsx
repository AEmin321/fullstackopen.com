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

export default Course;