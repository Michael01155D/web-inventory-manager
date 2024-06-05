import { useState } from "react";
import "../styles/Product.css";
import "../styles/Button.css";
import EditStockForm from './EditStockForm.jsx';
import RenameProductForm from './RenameProductForm';

const Product = ({product, removeProduct, renameProduct, editStock}) => {
  
    const [showDetails, setShowDetails] = useState(false);
    const [displayStockForm, setDisplayStockForm] = useState(false);
    const [displayRenameForm, setDisplayRenameForm] = useState(false);

    const toggleDisplay = () => {
        setShowDetails(!showDetails);
        setDisplayRenameForm(false);
        setDisplayStockForm(false);
    }
    return(
        <section id="productView">
            {showDetails ?
                <section id="detailedProduct"> 
                    <p>Name: {product.name} | Current Stock: {product.stock} | Serial Code: {product.serialCode}</p>
                    <button id="editStockButton" onClick={() => setDisplayStockForm(!displayStockForm) }>Edit Stock</button>
                    <button  id="renameProductButton" onClick={() => setDisplayRenameForm(!displayRenameForm)}>Rename Product</button>
                    <button id="removeProductButton" onClick={() => removeProduct(product.name)}>Remove Product</button>
                </section>
                 :
                <p>{product.name}</p>
            }
            {displayStockForm && showDetails ? 
            <EditStockForm editStock={editStock} productName={product.name} />
            :<></>

            }
            {displayRenameForm  && showDetails ? 
                <RenameProductForm renameProduct={renameProduct} oldName={product.name}/>
            :<></>
            }
            
            <button id="toggleProductView" onClick={() => toggleDisplay()}>{showDetails ? "Hide details" : "Show details "}</button>
        </section>
    )
}

export default Product;