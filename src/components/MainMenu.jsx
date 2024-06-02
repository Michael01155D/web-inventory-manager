import { useState } from "react";
import "../styles/MainMenu.css";
import Product from './Product';
import Button from './Button';
import SearchBar from "./SearchBar";

const MainMenu = ({inventory}) => {
    const commands = ["Add Product", "Remove Product", "Rename Product", "Modify Product Stock", "Clear Inventory" ]
    const [query, setQuery] = useState("");
    console.log("query is ", query)
    return(
        <main id="mainMenuScreen">
            <SearchBar query={query} setQuery={setQuery}/>
            <section id="inventoryList">
                <h3>Inventory List:</h3>
                {inventory.getProducts()
                    .filter(product => product.name.toLowerCase().includes(query.toLowerCase().trim()))
                    .map(product => <Product key={product.serialCode} product={product} />)}
            </section>
        </main>
    )
}

export default MainMenu;