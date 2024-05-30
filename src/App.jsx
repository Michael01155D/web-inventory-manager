import { useState } from 'react'
import './App.css'
import StartingScreen from './components/StartingScreen'
import Navbar from './components/Navbar'
const App = () => {

  return (
    <main>
      <header>
        <Navbar/>
      </header>
      <section>
        <StartingScreen/>
      </section>
    </main>
  )
}

export default App
