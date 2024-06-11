import { useEffect, useState } from "react";
import { updateProduct } from '../../backend';

const EditStockForm = ({ product, setProductData }) => {
    const [newStock, setNewStock] = useState(0);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = {...product, stock: newStock}; 
        await updateProduct(updatedProduct)
        setProductData(updatedProduct)
    }


    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="newStockInput">New Stock Amount for {product.name} (0-999)</label>
            <input id="newStockInput" type='number' value={newStock.toString()}
                min="0" max="999"
             onChange={(newStock) => setNewStock(newStock.target.value.toString())}/>
            <button type="submit">Update Stock</button>
        </form>
        </>
    )   
}

export default EditStockForm;