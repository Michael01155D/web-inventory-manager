export let products = [];

export const addProduct = (newProduct) => {
    products = [...products, newProduct]
}

export const removeProduct = (productName) => {
    products = products.filter(product => product.name !== productName);
}

export const renameProduct = (newName, oldName) => {
    products = products.map(product => product.name == oldName ? {...product, name: newName} : product)
}

export const editStock = (productName, newStock) => {
    products = products.map(p => p.name == productName ? {...p, stock: newStock} : p)
}
