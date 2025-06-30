import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userName: String,
  email: String,
  phone: String,
  address: String,
  items: [
    {
      _id: String,
      title: String,
      selectedSize: {
        label: String,
        price: Number,
      },
      images: [String],
    },
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Order', orderSchema);
