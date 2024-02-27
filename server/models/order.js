const mongoose = require('mongoose');
const { ProductSchema } = require('./product');

const orderSchema = mongoose.Schema({
    products: [
        {
          product: ProductSchema,
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      userId: {
        required: true,
        type: String,
      },
      orderedAt: {
        type: Number,
        required: true,
      },
      status: {
        type: Number,
        default: 0,
      },
    });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;