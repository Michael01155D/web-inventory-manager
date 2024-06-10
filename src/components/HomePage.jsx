import { useEffect, useState } from "react";
import StartingScreen from "./StartingScreen";
import MainMenu from "./MainMenu";
import { addProduct, updateProduct, removeProduct, clearInventory } from "../../backend";
const HomePage = ({ inventory, moo }) => {
   const [displayStart, setDisplayStart] = useState(true);

   //ensure starting page only reached if inventory is empty
   useEffect(() => {
    if (inventory.getProducts().length > 0) {
        setDisplayStart(false);
    }
   }, [])
   const [products, setProducts] = useState([]);

   useEffect(() => {
    setProducts(moo);
    console.log("useEffect fired")
   }, [moo])

   const addNewProduct = async() => {
     const newProduct = await addProduct({name: "testingAdd", stock: "111"});
     console.log("response is ", newProduct)
     setProducts([...products].concat(newProduct));
  }

  const testReName = async(newName, id) => {
    const product = products.find(prod => prod.id == id);
    if (product != undefined) {
      const updatedProduct = {...product, name: newName};
      await updateProduct(updatedProduct);
      const updatedProducts = products.map(p => p.id == id ? updatedProduct : p);
      console.log("after map, updatedProducts is", updatedProducts);
      setProducts(updatedProducts);
    }
    else {
      console.log("Error, product not found in inventory.")
    }
  }

  const testEditStock = async(newStock, id) => {
    const product = products.find(prod => prod.id == id)
    if (product != undefined) {
      const updatedProduct = {...product, stock: newStock};
      await updateProduct(updatedProduct);
    }
  }

  const testRemove = async (productId) => {
    const product = products.find(prod => prod.id == productId);
    await removeProduct(product);
  }

  const testClear = async () => {
    await clearInventory();
  }
  //temporary debugging
  if (true) {
    return (
        <>
        {products ? products.map(p => <p>{p.name}</p>) : <></>}
      <button onClick={() => addNewProduct()}>testing addProduct</button>
      <button onClick={() => testReName("renamed", products[0].id)}>Testing Rename </button>
      <button onClick={() => testEditStock("999", products[0].id)}>Testing stock edit </button>
      <button onClick={() => testRemove(products[0].id)}>Testing Remove </button>
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