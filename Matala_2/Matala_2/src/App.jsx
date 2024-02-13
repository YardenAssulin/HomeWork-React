import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CCColors from './Class Components/CCColors'
import CCGrades from './Class Components/CCGrades'
import CCTable from './Class Components/CCTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="colorsDiv">
        <CCColors/>
      </div>
      <div id="gradesFormDiv">
        <CCGrades/>
      </div>
      <div id="tableDiv">
        <CCTable/>
      </div>

    </>
  )
}

export default App
