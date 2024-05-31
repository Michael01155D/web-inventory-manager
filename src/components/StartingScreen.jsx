import { useState } from "react"
import Button from './Button';
import { createNewProduct } from "../defaultProductCreator.js";
import "../styles/Button.css";


const StartingScreen = ({ inventory, setDisplayStart }) => {
    const [startOption, setStartOption] = useState(false);
    const [numProducts, setNumProducts] = useState("1-30");

    const createDefaultInventory = () => {
        setStartOption("default");
    }

    const createCustomInventory = () => {
        setStartOption("custom");
    }

    const setUpInventory = (e) => {
        e.preventDefault();
        if (isNaN(numProducts)) {return}
        console.log(+numProducts)
        if (startOption == "default") {
            for (let i = 0; i < numProducts; i++) {
                inventory.addProduct(createNewProduct(inventory.getProducts()));
            }
        } else {
            console.log("custom start!")
        }
        console.log("inventory after setup is: ", inventory)
        setDisplayStart(false);
    }

    return(
        <> 
        { !startOption ?
           <> 
                <p>Please Choose Between a Default or Custom Starting Inventory</p>
                <Button label="Default Inventory" handleClick={createDefaultInventory} />
                <Button label="Custom Inventory" handleClick={createCustomInventory} />
            </>
            :
            <>
                <form onSubmit={setUpInventory}>
                    <label htmlFor="startingProducts"> Number of Starting Products (1 to 30):</label>
                        <input name="startingProducts" type="number" min="1" max="30" value={numProducts} onChange={e => setNumProducts(+e.target.value)}/>
                    <button type="submit" className="submit_button"> Set Up Inventory</button>
                </form>
            </>
        }
        </>
    )
}

export default StartingScreen