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
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course}/>
      <Content part1={part1.name} part2={part2.name} part3={part3.name} exer1={part1.exercises} exer2={part2.exercises} exer3={part3.exercises}/>
      <Total exercise1={part1.exercises} exercise2={part2.exercises} exercise3={part3.exercises}/>
    </div>
  )
}

export default App