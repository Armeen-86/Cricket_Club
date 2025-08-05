const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
    buyerName: { type: String, required: true },
    seats: { type: Number, default: 1 },
    price: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", TicketSchema);
