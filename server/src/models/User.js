import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    savedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "items" }]
});

export const UserModel = mongoose.model("users", UserSchema);