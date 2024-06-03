import { useState } from "react";
import "../styles/Product.css";

const Product = ({product}) => {
    const todos = ["Remove Product", "Rename Product", "Modify Product Stock"]
    const [showDetails, setShowDetails] = useState(false);
    return(
        <section id="productView">
            {showDetails ?
                <section id="detailedProduct"> 
                    <p>Name: {product.name} | Current Stock: {product.stock} | Serial Code: {product.serialCode}</p>
                    <button id="editStockButton">Edit Stock</button>
                    <button  id="renameProductButton">Rename Product</button>
                    <button id="removeProductButton" onClick={() => removeProduct(product.name)}>Remove Product</button>
                </section>
                 :
                <p>{product.name}</p>
            }
            <button id="toggleProductView" onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide details" : "Show details "}</button>
        </section>
    )
}

export default Product;