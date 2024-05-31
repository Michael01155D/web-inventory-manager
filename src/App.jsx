import {useRef} from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventory from './Inventory.js';
import HomePage from './components/HomePage.jsx';


const App = () => {
  //todo: replace inventory object with DB collection fetched by server
  const inventory = useRef(new Inventory())
  return (
    <BrowserRouter>
      <Routes> 
          <Route path='/' element={<HomePage inventory={inventory.current}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
