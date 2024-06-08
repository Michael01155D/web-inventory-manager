import {useEffect, useRef, useState} from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventory from './Inventory.js';
import HomePage from './components/HomePage.jsx';
import NewProductPage from './components/NewProductPage.jsx';
import {addProduct, getProducts, renameProduct, editStock, removeProduct, clearInventory} from '../backend.js';

const App = () => {
  //todo: replace inventory object with DB collection fetched by server
  //moo is temporary to test json-server before refactoring App to fetch inventory from db.json
  const [moo, setMoo] = useState("")
  useEffect( () => {
    getProducts().then((res) =>{
      setMoo(res);
    })
  }, [])
  console.log('moo is, ', moo)
  const inventory = useRef(new Inventory())
  return (
    <BrowserRouter>
      <Routes> 
          <Route path='/' element={<HomePage inventory={inventory.current} moo={moo}/>}/>
          <Route path='/add' element={<NewProductPage inventory={inventory.current}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
