import mongoose, { Schema } from "mongoose";

const cryptoDataSchema = new Schema({
    coinId: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const Crypto = mongoose.model("Crypto", cryptoDataSchema);
