import mongoose from "mongoose";

const manufacturerSchema = mongoose.Schema({
  orderID: { type: String, required: true },
  to: { type: String, required: true },
  from: { type: String, required: true },
  quantity: { type: String, required: true },
  address: { type: String, required: true },
  transporter: { type: String, required: true },
  price: { type: String},
});

export default mongoose.model("Message", manufacturerSchema);
