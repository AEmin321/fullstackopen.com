import { useState } from 'react'

const Title=({title})=><h1>{title}</h1>
const Button=({onClick,text})=><button onClick={onClick}>{text}</button>

function App() {
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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App
