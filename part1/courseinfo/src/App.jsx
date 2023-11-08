const Total = (props) => {
  return <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>;
}
const Content = (props) => {
  return (<div>
    <Part part={props.part1} exercise={props.exer1}/>
    <Part part={props.part2} exercise={props.exer2}/>
    <Part part={props.part3} exercise={props.exer3}/>
  </div>);
}

const Part = (props) => {
  return <p>{props.part} {props.exercise}</p>;
}
const Header = (props) => {
  return <h1>{props.name}</h1>;
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  console.log (course.parts[2].exercises);
  return (
    <div>
      <Header name={course.name}/>
      <Content part1={course.parts[0].name} exer1={course.parts[0].exercises} part2={course.parts[1].name} exer2={course.parts[1].exercises} part3={course.parts[2].name} exer3={course.parts[2].exercises}/>
      <Total exercise1={course.parts[0].exercises} exercise2={course.parts[1].exercises} exercise3={course.parts[2].exercises}/> 
    </div>
  )
}

export default App