const mongoose = require('mongoose');
const ratingSchema = require('./rating');

const ProductSchema  = mongoose.Schema({
    name:{
        type:String, 
        require:true,
        trim:true,
    },
    description:{
        type:String,
        require:true,
        trim:true,
    },
    quantity:{
        type:Number,
        require:true,
        trim:true,
    },
    images:[
        {
            type:String,
            require:true,
        }
    ],
    category:{
        type:String,
        require:true,
    },
    price:{
        type:Number, 
        require:true,
    },
    rating:[ratingSchema],
},)
 const Product = mongoose.model('product', ProductSchema);
 module.exports = {Product, ProductSchema};