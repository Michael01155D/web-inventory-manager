import { useEffect, useState } from "react";
import StartingScreen from "./StartingScreen";
import MainMenu from "./MainMenu";
import {addProduct, renameProduct, editStock, removeProduct, clearInventory } from "../../backend";
const HomePage = ({ inventory }) => {
   const [displayStart, setDisplayStart] = useState(true);

   //ensure starting page only reached if inventory is empty
   useEffect(() => {
    if (inventory.getProducts().length > 0) {
        setDisplayStart(false);
    }
   }, [])

   const writeToDb = async() => {
    await addProduct({name: "testingAdd", stock: "111"});
  }

  const testReName = async() => {
    await renameProduct("testingRename", "testingAdd");
  }

  const testEditStock = async() => {
    await editStock("testingRename", 999);
  }

  const testRemove = async () => {
    await removeProduct("testingRename");
  }

  const testClear = async () => {
    await clearInventory();
  }
  //temporary debugging
  if (true) {
    return (
        <>
      <button onClick={() => writeToDb()}>testing addProduct</button>
      <button onClick={() => testReName()}>Testing Rename </button>
      <button onClick={() => testEditStock()}>Testing stock edit </button>
      <button onClick={() => testRemove()}>Testing Remove </button>
      <button onClick={() => testClear()}>Testing Clear </button>
        </>

    )
  }

    return( 
        <>
        { displayStart ?
         <StartingScreen inventory={inventory} setDisplayStart={setDisplayStart}/>
        :
        <MainMenu inventory={inventory}/>
        }
        </>

    )
}

export default HomePage;