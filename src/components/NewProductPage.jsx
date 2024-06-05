import { useState } from "react";
import { generateSerialCode } from "../defaultProductCreator";
import DisplayMessage, { toggleMessage } from "./DisplayMessage";
import { Link } from "react-router-dom";
import "../styles/NewProductPage.css";

const NewProductPage = ({inventory}) => {
    const [productName, setProductName] = useState("");
    const [productStock, setProductStock] = useState("");
    const [displayMsg, setDisplayMsg] = useState("");
    const [isError, setIsError] = useState(false);
    //reused from StartingScreen, todo: refactor and put into DisplayMessage or import from seperate file

    const addNewProduct = (e) => {
        e.preventDefault();
        if (inventory.getProducts().map(product => product.name).includes(productName)) {
            setIsError(true);
            setDisplayMsg(`Error: ${productName} is already in the Inventory!`);
        } else {
            const newProduct = { name: productName, stock: productStock, serialCode: generateSerialCode(inventory.getProducts())}
            inventory.addProduct(newProduct);
            setDisplayMsg(`${productName} added to the Inventory!`)
        }
        toggleMessage(setIsError, setDisplayMsg);
        setProductName("");
        setProductStock(0);
    }
    return(
        <>  
            {displayMsg.length > 0 ? 
                <DisplayMessage id="displayMsg" displayMessage={displayMsg} isError={isError}/>
                :
                <></>
        }
            <form onSubmit={addNewProduct} id="createCustomInventoryForm">
                        <div id="nameInputs">
                            <label id="productNameLabel" htmlFor="productName">Product Name: </label>
                            <input id="productName" autoFocus name="productName" value={productName.trimStart()} minLength="2" required maxLength="18" onChange={e => setProductName(e.target.value)}/>
                        </div>
                        <div id="stockInputs">
                            <label id="productStockLabel" htmlFor="productStock">Starting Quantity (0 to 999): </label>
                            <input name="productStock" id="productStock" type="number" required min="0" max="999" value={productStock.toString()} onChange={e => setProductStock(+e.target.value.toString())}/>
                        </div>
                        <button id="addProductButton" type="submit" className="submit_button">Add Product</button>
                    </form>
                    <Link to="/">Return to Main Menu</Link>
        </>
    )
}

export default NewProductPage;