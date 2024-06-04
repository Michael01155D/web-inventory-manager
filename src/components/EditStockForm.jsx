import { useState } from "react";

const EditStockForm = ({ editStock, productName}) => {
    const [newStock, setNewStock] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        editStock(productName, newStock);
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="newStockInput">New Stock Amount for {productName} (0-999)</label>
            <input id="newStockInput" type='number' value={newStock.toString()}
                min="0" max="999"
             onChange={(newStock) => setNewStock(newStock.target.value.toString())}/>
            <button type="submit">Update Stock</button>
        </form>
        </>
    )   
}

export default EditStockForm;