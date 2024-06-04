import { useState } from "react"
import Button from './Button';
import { createNewProduct, generateSerialCode } from "../defaultProductCreator.js";
import "../styles/Button.css";
import "../styles/StartingScreen.css"
import DisplayMessage from "./DisplayMessage.jsx";


const StartingScreen = ({ inventory, setDisplayStart }) => {
    const [startOption, setStartOption] = useState(false);
    const [numProducts, setNumProducts] = useState("");
    const [newProductName, setNewProductName] = useState("");
    const [newProductStock, setNewProductStock] = useState(0);
    //isError/displayMsg used for DisplayMessage component
    const [isError, setIsError] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");

    const toggleMessage = () => {
        setTimeout(() => {
            setIsError(false);
            setDisplayMsg("");
        }, 1500)
    }
    const createDefaultInventory = () => {
        setStartOption("default");
    }

    const createCustomInventory = () => {
        setStartOption("custom");
    }

    const addNewProduct = (e) => {
        e.preventDefault();
        const currentProducts = inventory.getProducts();
        if (currentProducts.map(p => p.name).includes(newProductName)) {
            setIsError(true)
            setDisplayMsg(`Error: ${newProductName} is already in the inventory!`);            
        } else {
            const newProduct = {name: newProductName, stock: newProductStock, serialCode: generateSerialCode(currentProducts)};
            inventory.addProduct(newProduct);
            setIsError(false);
            setDisplayMsg(`Added ${newProductStock} ${newProductName} to the inventory!`);
        }
        toggleMessage();
        setNewProductName("");
        setNewProductStock("")
    }
    const setUpDefaultInventory = (e) => {
        e.preventDefault();
        if (isNaN(numProducts)) {return}
        for (let i = 0; i < numProducts; i++) {
            inventory.addProduct(createNewProduct(inventory.getProducts()));
        }
        setDisplayStart(false);
    }

    const setUpCustomInventory = () => {
        setDisplayStart(false);
    }

    if (!startOption) {
        return (
            <> 
            <p>Please Choose Between a Default or Custom Starting Inventory</p>
            <Button label="Default Inventory" handleClick={createDefaultInventory} />
            <Button label="Custom Inventory" handleClick={createCustomInventory} />
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
                    <button type="submit" className="submit_button"> Set Up Inventory</button>
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
                        <button id="addProductButton" type="submit" className="submit_button">Add Product</button>
                    </form>
                    <Button label={"Done"} id="done" handleClick={setUpCustomInventory}/>
                </section>
                <section id="itemsAdded">
                    {inventory.getProducts().length > 0 ?
                        <>
                            <p>Items added:</p>
                            <ul>
                                {inventory.getProducts().map(p => <li key={p.serialCode}>{p.name}</li>)}
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