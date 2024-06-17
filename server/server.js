import express from 'express';
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes.js";
import { configDotenv } from "dotenv"; //access env vars w/ process.env.NAME
import path from "path";
import cors from 'cors';
configDotenv({path: path.resolve("../.env")});


const mongoUrl = process.env.MONGO_URL
const server = express();
const port = 3000;
server.use(cors())
server.use(express.json())
server.use("/products", productRouter)

mongoose.connect(mongoUrl).then(console.log("MongoDB connected"));


server.listen(port, () => {
    console.log("Server is online on Port", port);
})


