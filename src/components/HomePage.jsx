import { useEffect, useState } from "react";
import StartingScreen from "./StartingScreen";
import MainMenu from "./MainMenu";
import { addProduct } from "../../backend";
const HomePage = ({ inventory }) => {
   const [displayStart, setDisplayStart] = useState(true);

   //ensure starting page only reached if inventory is empty
   useEffect(() => {
    if (inventory.getProducts().length > 0) {
        setDisplayStart(false);
    }
   }, [])

   const writeToDb = async() => {
    await addProduct({name: "testingPOST", stock: "111"});
  }
  //temporary debugging
  if (true) {
    return (
      <button onClick={() => writeToDb()}>testing POST method</button>
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