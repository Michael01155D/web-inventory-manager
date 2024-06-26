import { useState } from "react";
import "../styles/MainMenu.css";
import "../styles/Button.css";
import Product from './Product';
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import DisplayMessage, { toggleMessage } from "./DisplayMessage";
import { clearInventory, updateProduct, removeProduct } from "../connections/products.js";

const MainMenu = ({inventory, setInventory}) => {
    const [query, setQuery] = useState("");
    const [displayMsg, setDisplayMsg] = useState("");
    const [isError, setIsError] = useState(false);
    const [displayAllDetails, setDisplayAllDetails] = useState(false);

    const clearInventoryPrompt = async() => {
        if (window.confirm("Warning! This is an irreversable action. Do you want to reset the Inventory?")) {
            await clearInventory();
            setInventory([]);
        }
    }

    const handleDelete = async(product) => {
        await removeProduct(product);
        const newInventory = inventory.filter(p => p._id != product._id);
        setInventory(newInventory);
    }

    const allowRename = (newName) => {return !inventory.map(product => product.name.toLowerCase().trim()).includes(newName.toLowerCase().trim())}

    const handleRename = async (newName, oldName) => {
        if (allowRename(newName)) {
            const product = inventory.find(p => p.name == oldName);
            const updatedProduct = {...product, name: newName};
            await updateProduct(updatedProduct);
            setInventory(inventory.map(p => p.name == oldName ? updatedProduct : p));

        }
    }

    const handleStockEdit = async (product, newStock) => {
        const updatedProduct = {...product, stock: newStock}; 
        await updateProduct(updatedProduct)
        setInventory(inventory.map(p => p.name == product.name ? updatedProduct : p));
    }
    //todo: once db is implemented, add Link for each Product to link to /products/:id for detail screen
    return(
        <main id="mainMenuScreen">
            <header id="inventoryCommands">
                <Link to="add" >Add New Product</Link>
                <button id="clearInventoryButton" onClick={()=> clearInventoryPrompt()}>Reset the Inventory</button>
            </header>
            <SearchBar query={query} setQuery={setQuery}/>
            
            {displayMsg.length > 0 ? 
                <DisplayMessage id="displayMsg" displayMessage={displayMsg} isError={isError}/>
                :
                <></>
            }

            <section id="inventoryList">
                <h3>Inventory List:</h3>
                {inventory.length > 0 ?
                    [
                        <button key="detailsButton" id="toggleAllDetails" onClick={() => setDisplayAllDetails(!displayAllDetails)}>{displayAllDetails ? "Hide all details" : "Show all details"}</button>
                        ,
                        inventory
                        .filter(product => product.name.toLowerCase().includes(query.toLowerCase().trim()))
                        .map(product => <Product 
                            key={product._id} 
                            product={product}
                            allowRename={allowRename}
                            handleRename={handleRename}
                            handleDelete={handleDelete}
                            handleStockEdit={handleStockEdit} 
                            displayAllDetails={displayAllDetails}  
                            />
                        ),
                    ]
                        :
                        <p>The Inventory is currently empty! Click on Add New Product to add new products!</p>
                }
            </section>
        </main>
    )
}

export default MainMenu;

    //previous implementations using Inventory.js class file:
    // const removeProduct = (productName) => {    
    //     inventory.removeProduct(productName);
    //     forceUpdate();
    // }

    // const editStock = (productName, newStock) => {
    //     inventory.editStock(productName, newStock);
    //     forceUpdate();
    // }

    // const renameProduct = (newName, oldName) => {
    //     if (inventory.map(product => product.name.toLowerCase().trim()).includes(newName.toLowerCase().trim())){
    //         setDisplayMsg(`Error: ${newName} is already in the Inventory! Please remove it before changing ${oldName} `);
    //         setIsError(true);
    //     } else {
    //         setDisplayMsg(`Successfully renamed ${oldName} to ${newName}`);
    //         inventory.renameProduct(newName, oldName);
    //         forceUpdate();
    //     }
    //     toggleMessage(setIsError, setDisplayMsg);
    // }
