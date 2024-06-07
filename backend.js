//import data from "./db.json" with { type: "json"};

//todo: learn express and change backend to express
//import express from 'express';
// const server = express();
// const port = 3000;

// server.get("/products", async (req, res) => {
//     res.send(data);
// })

// server.get("/", async (req, res) => {
//     res.sendFile("./src/main.jsx")
// })

// server.listen(port, () => {
//     console.log("Server is online on Port", port);
// })

const URL = "http://localhost:3000/products";

const updateDb = async (data) => {
    const res = await fetch(URL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    });
    return res.json();
}

const addProduct = async (newProduct) => {
    const newCode = await generateSerialCode();
    const toAdd = {...newProduct, serialCode: newCode};
    const products = await getProducts();
    products.push(toAdd);
    const res = await updateDb(products);
}

const getProducts = async (req, res) => {
    const data = await fetch(URL);
    const body = await data.json();
    return body;
}

const renameProduct = (newName, oldName) => {
    products = products.map(product => product.name == oldName ? {...product, name: newName} : product);
    updateDb(products);
}

const editStock = (productName, newStock) => {
    products = products.map(p => p.name == productName ? {...p, stock: newStock} : p);
    updateDb(products);
}

const removeProduct = (productName) => {
    products = products.filter(p => p.name !== productName);
    updateDb(products);
}

const clearInventory = () => {
    products = [];
    updateDb(products);
}


const generateSerialCode = async () => {
    const alpha = "abcdefghijklmnopqrstuvwxyz".split("").map(char => char + char.toUpperCase()).join("").split("");
    const num = "0123456789".split("");
    let code = "";
    const products = await getProducts();
    console.log("in generateSerial code, products is", products);   
    do {
        for (let i = 0; i < 12; i++) {
            if (i % 2 == 0) {
                const randLetterIndex = Math.floor(Math.random() * 52);
                code += alpha[randLetterIndex];
            } else {
                const randNumIndex = Math.floor(Math.random() * 9);
                code += num[randNumIndex];
            }
        } 
        //ensure an existing product doesn't have the serialCode already
    } while (products.map(product => product.serialCode).includes(code));
    
//quick combinatoric check: 6 numbers & 6 letters w. repeats. possible combinations = 10^6 * 52^6: 19.7 billion * 100,000 codes possible. much greater than max array length possible
    return code;
};

export {addProduct, getProducts, renameProduct, editStock, removeProduct, clearInventory };