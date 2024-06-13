import { useState } from "react";
import DisplayMessage, { toggleMessage } from "./DisplayMessage";
import { Link } from "react-router-dom";
import "../styles/NewProductPage.css";
import "../styles/Button.css";
import { addProduct } from "../../backend";

const NewProductPage = ({inventory}) => {
    const [productName, setProductName] = useState("");
    const [productStock, setProductStock] = useState(0);
    const [displayMsg, setDisplayMsg] = useState("");
    const [isError, setIsError] = useState(false);

    const addNewProduct = async (e) => {
        e.preventDefault();
        if (inventory.map(product => product.name).includes(productName)) {
            setIsError(true);
            setDisplayMsg(`Error: ${productName} is already in the Inventory!`);
        } else {
            const newProduct = { name: productName, stock: productStock}
            await addProduct(newProduct);
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
                        <button id="addProductButton" type="submit" className="submitButton">Add Product</button>
                    </form>
                    <Link to="/">Return to Main Menu</Link>
        </>
    )
}

export default NewProductPage;