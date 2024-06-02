import { useState } from "react";
import "../styles/MainMenu.css";
import Product from './Product';
import Button from './Button';

const MainMenu = ({inventory}) => {
    const [displayInventory, setDisplayInventory] = useState(true);
    const toggleDisplay = () => {
        setDisplayInventory(!displayInventory);
    }
    const commands = ["Add Product", "Remove Product", "Rename Product", "Modify Product Stock", "Clear Inventory" ]
    return(
        <main>
            <section id="inventoryList">
            <Button label={displayInventory ? "Hide Inventory" : "Show Inventory"} handleClick={toggleDisplay}/>
                {displayInventory ?
                    <>
                    <h3>Inventory List:</h3>
                    {inventory.getProducts().map(product => <Product key={product.serialCode} product={product} />)}
                    </>
                    :
                    <></>
                }
            </section>
            <section id="commands">
                <h3>Please Select a Command</h3>
                <p>todo</p>
            </section>
        </main>
    )
}

export default MainMenu;