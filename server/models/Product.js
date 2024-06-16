import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: { type: String, minlength: 2, maxlength: 14, required: true },
    stock: { type: Number, min: 0, max: 999, default: 0 },
    serialCode: { type: String, required: true }
})

export default mongoose.model("Product", productSchema);