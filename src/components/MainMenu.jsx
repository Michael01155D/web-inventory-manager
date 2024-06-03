import { useEffect, useState, useReducer } from "react";
import "../styles/MainMenu.css";
import Product from './Product';
import SearchBar from "./SearchBar";

const MainMenu = ({inventory}) => {
    const [query, setQuery] = useState("");
    const todos = ["Add product button", "clear inventory button"];
    const [products, setProducts] = useState(inventory);
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    const removeProduct = (productName) => {    
        inventory.removeProduct(productName);
        setProducts(inventory);
        forceUpdate() 
    }

    useEffect(()=> {
        console.log("i", inventory)
    }, [products])

    //todo: once db is implemented, add Link for each Product to link to /products/:id for detail screen
    return(
        <main id="mainMenuScreen">
            <SearchBar query={query} setQuery={setQuery}/>
            <section id="inventoryList">
                <h3>Inventory List:</h3>
                {products.getProducts()
                    .filter(product => product.name.toLowerCase().includes(query.toLowerCase().trim()))
                    .map(product => <Product key={product.serialCode} product={product} removeProduct={removeProduct}  />
                        )}
            </section>
        </main>
    )
}

export default MainMenu;