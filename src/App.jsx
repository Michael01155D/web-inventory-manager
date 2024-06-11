import {useEffect, useState} from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage.jsx';
import NewProductPage from './components/NewProductPage.jsx';
import {getProducts} from '../backend.js';

const App = () => {
  //current WIP: refactoring app to use db.json for inventory data

  const [inventory, setInventory] = useState([])
  useEffect( () => {
    getProducts().then((res) =>{
      setInventory(res);
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes> 
          <Route path='/' element={<HomePage inventory={inventory} setInventory={setInventory} />}/>
          <Route path='/add' element={<NewProductPage inventory={inventory}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
