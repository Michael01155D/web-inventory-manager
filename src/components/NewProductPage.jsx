import { useState } from "react";
import { generateSerialCode } from "../defaultProductCreator";
import DisplayMessage from "./DisplayMessage";
import { Link } from "react-router-dom";

const NewProductPage = ({inventory}) => {
    const [productName, setProductName] = useState("");
    const [productStock, setProductStock] = useState(0);
    const [displayMsg, setDisplayMsg] = useState("");
    const [isError, setIsError] = useState(false);
    //reused from StartingScreen, todo: refactor and put into DisplayMessage or import from seperate file
    const toggleMessage = () => {
        setTimeout(() => {
            setIsError(false);
            setDisplayMsg("");
        }, 1500)
    }
    
    const addNewProduct = (e) => {
        e.preventDefault();
        if (inventory.getProducts().map(product => product.name).includes(productName)) {
            setDisplayMsg(`Error: ${productName} is already in the Inventory!`);
            setIsError(true);
            toggleMessage();
            setProductName("")
            setProductStock(0)
        } else {
            const newProduct = { name: productName, stock: productStock, serialCode: generateSerialCode(inventory.getProducts())}
            inventory.addProduct(newProduct);
            setDisplayMsg(`${productName} added to the Inventory!`)
            toggleMessage();
        }
        console.log("inventory is ", inventory)
    }
    return(
        <>  
            {displayMsg.length > 0 ? 
                <DisplayMessage id="displayMsg" displayMessage={displayMsg} isError={isError}/>
                :
                <></>
        }
            <DisplayMessage displayMessage={displayMsg} isError={isError} />
            <form onSubmit={addNewProduct} id="createCustomInventoryForm">
                        <div id="nameInputs">
                            <label id="productNameLabel" htmlFor="productName">Product Name: </label>
                            <input id="productName" autoFocus name="productName" value={productName.trimStart()} minLength="2" required maxLength="18" onChange={e => setProductName(e.target.value)}/>
                        </div>
                        <div id="stockInputs">
                            <label id="productStockLabel" htmlFor="productStock">Starting Quantity (0 to 999): </label>
                            <input name="productStock" id="productStock" type="number" required min="0" max="999" value={productStock} onChange={e => setProductStock(+e.target.value)}/>
                        </div>
                        <button id="addProductButton" type="submit" className="submit_button">Add Product</button>
                    </form>
                    <Link to="/">Return to Main Menu</Link>
        </>
    )
}

export default NewProductPage;