import { useState } from "react";
import "../styles/Product.css";
import RenameProductForm from './RenameProductForm';

const Product = ({product, removeProduct, renameProduct}) => {
    const todos = [ "Rename Product", "Modify Product Stock"]
    const [showDetails, setShowDetails] = useState(false);
    const [displayRenameForm, setDisplayRenameForm] = useState(false);
    const [newPoductName, setNewProductName] = useState("");
    return(
        <section id="productView">
            {showDetails ?
                <section id="detailedProduct"> 
                    <p>Name: {product.name} | Current Stock: {product.stock} | Serial Code: {product.serialCode}</p>
                    <button id="editStockButton">Edit Stock</button>
                    <button  id="renameProductButton" onClick={() => setDisplayRenameForm(true)}>Rename Product</button>
                    <button id="removeProductButton" onClick={() => removeProduct(product.name)}>Remove Product</button>
                </section>
                 :
                <p>{product.name}</p>
            }
            {displayRenameForm ? 
                <RenameProductForm renameProduct={renameProduct} oldName={product.name}/>
            :<></>
            }
            <button id="toggleProductView" onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide details" : "Show details "}</button>
        </section>
    )
}

export default Product;