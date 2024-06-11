import { useState } from "react"
import { createDefaultProduct } from "../defaultProductCreator.js";
import "../styles/Button.css";
import "../styles/StartingScreen.css"
import DisplayMessage, {toggleMessage} from "./DisplayMessage.jsx";
import { addProduct } from "../../backend.js";


const StartingScreen = ({ inventory, setInventory, setDisplayStart }) => {
    const [startOption, setStartOption] = useState(false);
    const [numProducts, setNumProducts] = useState(0);
    const [newProductName, setNewProductName] = useState("");
    const [newProductStock, setNewProductStock] = useState(0);
    //isError/displayMsg used for DisplayMessage component
    const [isError, setIsError] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");

    const createDefaultInventory = () => {
        setStartOption("default");
    }

    const createCustomInventory = () => {
        setStartOption("custom");
    }

    const addNewProduct = async (e) => {
        e.preventDefault();
        if (inventory.map(p => p.name).includes(newProductName)) {
            setIsError(true)
            setDisplayMsg(`Error: ${newProductName} is already in the inventory!`);            
        } else {
            const newProduct = {name: newProductName, stock: newProductStock };
            await addProduct(newProduct);
            setIsError(false);
            setDisplayMsg(`Added ${newProductStock} ${newProductName} to the inventory!`);
        }
        toggleMessage(setIsError, setDisplayMsg);
        setNewProductName("");
        setNewProductStock(0)
    }

    const setUpDefaultInventory = async (e) => {
        e.preventDefault();
        let startingProducts = [];
        if (isNaN(numProducts)) {return}
        for (let i = 0; i < numProducts; i++) {
            const newProduct = createDefaultProduct(startingProducts);
            startingProducts = startingProducts.concat(newProduct);
        }
        const promises = startingProducts.map(p => addProduct(p));
        const createProducts = await Promise.all(promises);
        setInventory(createProducts);
        setDisplayStart(false);
    }

    const setUpCustomInventory = () => {
        setDisplayStart(false);
    }

    if (!startOption) {
        return (
            <> 
                <p>Please Choose Between a Default or Custom Starting Inventory</p>
                <button className="startingButton" onClick={() => createDefaultInventory()}>Default Inventory</button>
                <button className="startingButton" onClick={() => createCustomInventory()}>Custom Inventory</button>
            </>
        )
    }

    return(
        <> 
        {displayMsg.length > 0 ? 
            <DisplayMessage id="displayMsg" displayMessage={displayMsg} isError={isError}/>
            :
            <></>
        }

        { startOption == "default" ?
            <>
                <form onSubmit={setUpDefaultInventory}>
                    <label htmlFor="startingProducts"> Number of Starting Products (up to 30): </label>
                    <input id="startingProducts" autoFocus name="startingProducts" type="number" min="1" max="30" value={numProducts.toString()} onChange={e => setNumProducts(+e.target.value.toString())}/>
                    <button type="submit" className="submitButton"> Set Up Inventory</button>
                </form>
            </>
            :
            <section id="customStart">
                <section id="customStartInput">
                    <form onSubmit={addNewProduct} id="createCustomInventoryForm">
                        <div id="nameInputs">
                            <label id="productNameLabel" htmlFor="productName">Product Name: </label>
                            <input id="productName" name="productName" value={newProductName.trimStart()} minLength="2" required maxLength="18" onChange={e => setNewProductName(e.target.value)}/>
                        </div>
                        <div id="stockInputs">
                            <label id="productStockLabel" htmlFor="productStock">Starting Quantity (0 to 999): </label>
                            <input name="productStock" id="productStock" type="number" required min="0" max="999" value={newProductStock.toString()} onChange={e => setNewProductStock(+e.target.value.toString())}/>
                        </div>
                        <button id="addProductButton" type="submit" className="submitButton">Add Product</button>
                    </form>
                    <button  id="doneCustomSetup" onClick={() => setUpCustomInventory()}>Done</button>
                </section>
                <section id="itemsAdded">
                    {inventory.length > 0 ?
                        <>
                            <p>Items added:</p>
                            <ul>
                                {inventory.map(p => <li key={p.serialCode}>{p.name}</li>)}
                            </ul>
                        </>
                        :
                        <p>Start adding items to the inventory!</p>
                    }
                </section>
            </section>
        }
        </>
    )
}

export default StartingScreen;