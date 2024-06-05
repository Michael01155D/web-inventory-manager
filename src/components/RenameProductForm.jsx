import { useState } from "react";

const RenameProductForm = ({renameProduct, oldName}) => {
    const [newName, setNewName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        renameProduct(newName, oldName);
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="newNameInput">New Product name for {oldName}</label>
            <input id="newNameInput" value={newName} minLength="2" maxLength="14" onChange={(newText) => setNewName(newText.target.value)}/>
            <button type="submit">Update Name</button>
        </form>
        </>
    )   
}


export default RenameProductForm;