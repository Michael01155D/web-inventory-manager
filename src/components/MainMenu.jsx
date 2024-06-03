import { useEffect, useState } from "react";
import "../styles/MainMenu.css";
import Product from './Product';
import SearchBar from "./SearchBar";

const MainMenu = ({inventory}) => {
    const [query, setQuery] = useState("");
    const todos = ["Add product button", "clear inventory button"];
    const [products, setProducts] = useState(inventory);
    const removeProduct = (productName) => {    
        inventory.removeProduct(productName);
    }

    useEffect(()=> {
        setProducts(inventory);
    }, [inventory])

    //todo: once db is implemented, add Link for each Product to link to /products/:id for detail screen
    return(
        <main id="mainMenuScreen">
            <SearchBar query={query} setQuery={setQuery}/>
            <section id="inventoryList">
                <h3>Inventory List:</h3>
                {products.getProducts()
                    .filter(product => product.name.toLowerCase().includes(query.toLowerCase().trim()))
                    .map(product => <Product key={product.serialCode} product={product}  />
                        )}
            </section>
        </main>
    )
}

export default MainMenu;