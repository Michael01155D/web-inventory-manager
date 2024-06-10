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

//current todo: implement edit stock, remove product, and clear inventory

const addProduct = async (newProduct) => {
    const newCode = await generateSerialCode();
    const toAdd = {...newProduct, serialCode: newCode};
    const res = await fetch(URL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(toAdd)
    });
    return res.json();
}

const getProducts = async () => {
    const data = await fetch(URL);
    const body = await data.json();
    return body.length > 0 ? body : [];
}

const getProductById = async (id) => {
    const data = await fetch(`${URL}/${id}`);
    const product = await data.json();
    return product ? product : {};
}

const updateProduct = async (updatedProduct) => {

        if (updatedProduct) {
        const request = await fetch(`${URL}/${updatedProduct.id}`, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(updatedProduct)
        });
        const response = await request.json()
        console.log("response in updateProduct is, ", response)
       return response;
    }
}

const removeProduct = async (product) => {
    if (product) {
        await fetch(`${URL}/${product.id}`, {
            method: "DELETE",
        })
    }
}

const clearInventory = async () => {
    const products = await getProducts();
    products.map(async product => await removeProduct(product));
}

const generateSerialCode = async () => {
    const alpha = "abcdefghijklmnopqrstuvwxyz".split("").map(char => char + char.toUpperCase()).join("").split("");
    const num = "0123456789".split("");
    let code = "";
    const products = await getProducts(); 
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

export { addProduct, getProducts, updateProduct, removeProduct, clearInventory };