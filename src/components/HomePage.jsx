import { useEffect, useState } from "react";
import StartingScreen from "./StartingScreen";
import MainMenu from "./MainMenu";
import {getProducts, addProduct, renameProduct, editStock, removeProduct, clearInventory } from "../../backend";
const HomePage = ({ inventory, moo }) => {
   const [displayStart, setDisplayStart] = useState(true);

   //ensure starting page only reached if inventory is empty
   useEffect(() => {
    if (inventory.getProducts().length > 0) {
        setDisplayStart(false);
    }
   }, [])
   const [products, setProducts] = useState({});

   useEffect(() => {
    setProducts(moo);
   }, [moo])
   console.log("in homepage products is ", products)

   const writeToDb = async() => {
    await addProduct({name: "testingAdd", stock: "111"});
  }

  const testReName = async(newName, oldName) => {
    const data = await getProducts();
    const product = data.find(prod => prod.name == oldName)
    if (product != undefined) {
      const updatedProduct = {...product, name: newName};
      await renameProduct(updatedProduct);
    }
    else {
      console.log("Error, product with name: ", oldName + " not found in inventory.")
    }
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
      <button onClick={() => testReName("renamed", "testingAdd")}>Testing Rename </button>
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