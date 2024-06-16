import express, { json } from 'express';
import Product from "../models/Product.js"
const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

router.get("/:id", async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
})

router.post("/", async (req, res) => {
    console.log('req body is, ', req.body)
    const product = new Product(req.body);
    await product.save();
    res.json(product);
})

router.put("/:id", async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true} );
    await updatedProduct.save();
    res.json(updatedProduct);
})

router.delete("/:id", async (req, res) => {
    const productToDelete = await Product.findByIdAndDelete(req.params.id);
    res.json(productToDelete);
});

export default router;