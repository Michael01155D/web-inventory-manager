import express from 'express';
import mongoose from "mongoose";
import Product from "./models/Product";
import { configDotenv } from "dotenv"; //access env vars w/ process.env.NAME
configDotenv();

const server = express();
const port = 3000;

server.get("/products", async (req, res) => {
    res.send(data);
})

server.get("/", async (req, res) => {
    res.sendFile("./src/main.jsx")
})

server.listen(port, () => {
    console.log("Server is online on Port", port);
})

const mongoUrl = process.env.MONGO_URL;

const URL = process.env.BACKEND_URL;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("MongoDB connected"));
