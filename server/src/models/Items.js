import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    date: { type: Date, required: true},
    name: { type: String, required: true},
    amount: { type: Number, required: true },
    type: { type: String, required: true},
    category: { type: String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}
});

export const ItemModel = mongoose.model("items", ItemSchema);