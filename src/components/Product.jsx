import { useEffect, useState } from "react";
import "../styles/Product.css";
import "../styles/Button.css";
import EditStockForm from './EditStockForm.jsx';
import RenameProductForm from './RenameProductForm';
import { removeProduct } from '../../backend.js';

const Product = ( {product, displayAllDetails, allowRename } ) => {
  
    const [showDetails, setShowDetails] = useState(displayAllDetails);
    const [displayStockForm, setDisplayStockForm] = useState(false);
    const [displayRenameForm, setDisplayRenameForm] = useState(false);
    //used to re-render component on PUT:
    const [productData, setProductData] = useState(product);

    useEffect(() => {
        setShowDetails(displayAllDetails);
    }, [displayAllDetails])

    const toggleDisplay = () => {
        setShowDetails(!showDetails);
        setDisplayRenameForm(false);
        setDisplayStockForm(false);
    }

    return(
        <section id="productView">
            { showDetails  ?
                <section id="detailedProduct"> 
                    <p> {productData.name} | Current Stock: {productData.stock} <span id="serialCode"> Serial Code: {productData.serialCode} </span></p>
                    <button id="editStockButton" onClick={() => setDisplayStockForm(!displayStockForm) }>Edit Stock</button>
                    <button  id="renameProductButton" onClick={() => setDisplayRenameForm(!displayRenameForm)}>Rename Product</button>
                    <button id="removeProductButton" onClick={() => removeProduct(productData.name)}>Remove Product</button>
                </section>
                 :
                <p>{productData.name}</p>
            }
            {displayStockForm && (showDetails || displayAllDetails) ? 
            <EditStockForm product={product} setProductData={setProductData} />
            :<></>

            }
            {displayRenameForm  && (showDetails || displayAllDetails) ? 
                <RenameProductForm allowRename={allowRename} product={product} setProductData={setProductData} />
            :<></>
            }
            
            <button id="toggleProductView" onClick={() => toggleDisplay()}>{showDetails || displayAllDetails ? "Hide details" : "Show details "}</button>
        </section>
    )
}

export default Product;