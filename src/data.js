let inventory = [];

export const addProduct = (newProduct) => {
    inventory = [...inventory, newProduct]
}

export const removeProduct = (productName) => {
    inventory = inventory.filter(product => product.name !== productName);
}

export const renameProduct = (newName, oldName) => {
    inventory = inventory.map(product => product.name == oldName ? {...product, name: newName} : product)
}

export const editStock = (productName, newStock) => {
    inventory = inventory.map(p => p.name == productName ? {...p, stock: newStock} : p)
}

export const clearInventory = () => {
    inventory = []; 
}

export default inventory;
