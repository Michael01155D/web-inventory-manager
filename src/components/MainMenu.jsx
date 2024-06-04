import { useState, useReducer } from "react";
import "../styles/MainMenu.css";
import Product from './Product';
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const MainMenu = ({inventory}) => {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState(inventory);
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const removeProduct = (productName) => {    
        inventory.removeProduct(productName);
        setProducts(inventory);
        forceUpdate();
    }

    const editStock = (productName, newStock) => {
        inventory.editStock(productName, newStock);
        setProducts(inventory);
        forceUpdate();
    }

    const renameProduct = (newName, oldName) => {
        inventory.renameProduct(newName, oldName);
        setProducts(inventory);
        forceUpdate();
    }

    const clearInventoryPrompt = () => {
        if (window.confirm("Warning! This is an irreversable action. Do you want to reset the Inventory?")) {
            inventory.clearInventory();
            setProducts(inventory);
            forceUpdate();
        }
    }

    //todo: once db is implemented, add Link for each Product to link to /products/:id for detail screen
    return(
        <main id="mainMenuScreen">
            <header id="inventoryCommands">
                <Link to={"add"}>Add New Product</Link>
                <button id="clearInventoryButton" onClick={()=> clearInventoryPrompt()}>Reset the Inventory</button>
            </header>
            <SearchBar query={query} setQuery={setQuery}/>
            <section id="inventoryList">
                <h3>Inventory List:</h3>
                {products.getProducts().length > 0 ?
                    products.getProducts()
                    .filter(product => product.name.toLowerCase().includes(query.toLowerCase().trim()))
                    .map(product => <Product 
                        key={product.serialCode} 
                        product={product} 
                        removeProduct={removeProduct}
                        editStock={editStock} 
                        renameProduct={renameProduct}  />
                        )
                    :
                    <p>The Inventory is currently empty! Click on Add New Product to add new products!</p>
                }
            </section>
        </main>
    )
}

export default MainMenu;