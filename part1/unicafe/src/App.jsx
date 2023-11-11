import { useState } from 'react'

const Title=({title})=><h1>{title}</h1>
const Button=({onClick,text})=><button onClick={onClick}>{text}</button>
const StatisticLine=({value,text})=><p>{text} {value}</p>
const Statistics=({good,neutral,bad})=>{
  const total=good+neutral+bad
  const average = (good + (bad * -1)) / total
  const positive = good / total * 100 
  if (total===0) {
    return <p>No feedback given</p>
  }

  return <div>
      <StatisticLine value={good} text="good"/>
      <StatisticLine value={neutral} text="neutral"/>
      <StatisticLine value={bad} text="bad"/>
      <StatisticLine value={total} text="total"/>
      <StatisticLine value={average} text="average"/>
      <StatisticLine value={positive+"%"} text="positive"/>
  </div>
}
const App=()=> {
  const [good,setGood]=useState(0)
  const [neutral,setNeutral]=useState(0)
  const [bad,setBad]=useState(0)
  const [allClicks,setClicks]=useState([])

  const handleGood=()=>setGood(good+1)
  const handlNeutral=()=>setNeutral(neutral+1)
  const handleBad=()=>setBad(bad+1)

  return (
    <div>
      <Title title="give feedback"/>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handlNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>

      <Title title="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
