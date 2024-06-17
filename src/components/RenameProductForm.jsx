import { useState } from "react";
import { updateProduct } from "../connections/products.js";
import DisplayMessage, {toggleMessage} from "./DisplayMessage";

const RenameProductForm = ({product, setProductData, allowRename}) => {
    const [newName, setNewName] = useState("");
    const [displayMsg, setDisplayMsg] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validRename = allowRename(newName);
        if (!validRename) {
            setIsError(true);
            setDisplayMsg(`Error: ${newName} is already in the inventory.`)
        } else {
            const updatedProduct = {...product, name: newName};
            await updateProduct(updatedProduct);
            setProductData(updatedProduct);
            setDisplayMsg(`Renamed ${product.name} to ${newName}`);
        }
        toggleMessage(setIsError, setDisplayMsg);
    }
    //todo, change display msg layout to block
    return (
        <>
        {displayMsg ?
            <DisplayMessage displayMessage={displayMsg} isError={isError}/> 
            : 
            <></>
        }
        <form onSubmit={handleSubmit}>
            <label htmlFor="newNameInput">New Product name for {product.name}</label>
            <input id="newNameInput" value={newName} minLength="2" maxLength="14" onChange={(newText) => setNewName(newText.target.value)}/>
            <button type="submit">Update Name</button>
        </form>
        </>
    )   
}


export default RenameProductForm;