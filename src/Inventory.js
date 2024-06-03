class Inventory {
    #products;

    constructor() {
        this.#products = [];
    }

    getProducts = () => {
        return this.#products;
    }
    
    addProduct = (newProduct) => {
        this.#products = [...this.#products, newProduct]
    }

    removeProduct = (productName) => {
       return this.#products = this.#products.filter(product => product.name !== productName);
    }

    renameProduct = (newName, oldName) => {
        console.log('newName is ', newName, ' oldname is ', oldName)
        this.#products = this.#products.map(product => product.name == oldName ? {...product, name: newName} : product)
    }

    editStock = (productName, newStock) => {
        this.#products = this.#products.map(p => p.name == productName ? {...p, stock: newStock} : p)
    }

    clearInventory = () => {
        this.#products = []; 
    }
}

export default Inventory;