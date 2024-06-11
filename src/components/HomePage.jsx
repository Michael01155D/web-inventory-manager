import { useEffect, useState } from "react";
import StartingScreen from "./StartingScreen";
import MainMenu from "./MainMenu";

const HomePage = ({ inventory, setInventory }) => {
   const [displayStart, setDisplayStart] = useState(true);

   //ensure starting page only reached if inventory is empty
   useEffect(() => {
    if (inventory.length > 0) {
        setDisplayStart(false);
    }
   }, [inventory])

    return( 
        <>
        { displayStart ?
         <StartingScreen inventory={inventory} setInventory={setInventory} setDisplayStart={setDisplayStart}/>
        :
        <MainMenu inventory={inventory} setInventory={setInventory}/>
        }
        </>

    )}

export default HomePage;

//for testing backend.js functions
//import { addProduct, updateProduct, removeProduct, clearInventory } from "../../backend";

//const testAddNewProduct = async() => {
  //    const newProduct = await addProduct({name: "testingAdd", stock: "111"});
  //    console.log("response is ", newProduct)
  //    setProducts([...products].concat(newProduct));
  // }

  // const testReName = async(newName, id) => {
  //   const product = products.find(prod => prod.id == id);
  //   if (product != undefined) {
  //     const updatedProduct = {...product, name: newName};
  //     await updateProduct(updatedProduct);
  //     const updatedProducts = products.map(p => p.id == id ? updatedProduct : p);
  //     console.log("after map, updatedProducts is", updatedProducts);
  //     setProducts(updatedProducts);
  //   }
  //   else {
  //     console.log("Error, product not found in inventory.")
  //   }
  // }

  // const testEditStock = async(newStock, id) => {
  //   const product = products.find(prod => prod.id == id)
  //   if (product != undefined) {
  //     const updatedProduct = {...product, stock: newStock};
  //     await updateProduct(updatedProduct);
  //     const updatedProducts = products.map(p => p.id == id ? updatedProduct : p)
  //     setProducts(updatedProducts);
  //   } else {
  //     console.log("Error, product not found in inventory");
  //   }
  // }

  // const testRemove = async (id) => {
  //   const product = products.find(prod => prod.id == id);
  //   await removeProduct(product);
  //   const updatedProducts = products.filter(p => p.id !== id);
  //   setProducts(updatedProducts);
  // }

  // const testClear = async () => {
  //   await clearInventory();
  //   setProducts([]);
  // }

    // if (true) {
  //   return (
  //       <>
  //       {products ? products.map(p => <p>{p.name}, {p.stock}</p>) : <></>}
  //     <button onClick={() => addNewProduct()}>testing addProduct</button>
  //     <button onClick={() => testReName("renamed", products[0].id)}>Testing Rename </button>
  //     <button onClick={() => testEditStock("999", products[0].id)}>Testing stock edit </button>
  //     <button onClick={() => testRemove(products[0].id)}>Testing Remove </button>
  //     <button onClick={() => testClear()}>Testing Clear </button>
  //       </> )}
