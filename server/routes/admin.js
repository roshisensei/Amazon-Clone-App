const express = require('express')
const admin = require('../middlewares/admin');
const {Product} = require('../models/product');
const adminRouter = express.Router();

// add a product
adminRouter.post('/admin/add-product', admin, async(req, res)=>{
    try{
        const {name, description, images, quantity, price, category} = req.body;
        let product = new Product({
            name,
            description,
            images,
            quantity,
            price,
            category
        });
         product = await product.save();
         return res.json(product);
    }catch(err){
        return res.status(500).json({error:err.message})
    }
})

// get all product

adminRouter.get('/admin/get-products',admin, async(req, res)=>{
    try{
        const products = await Product.find({}); 
        return res.json(products);

    }catch(err){
        return res.status(500).json({error:err.message});
    }
})

// delete a product by id

adminRouter.post('/admin/delete-product', admin, async(req, res)=>{
    try {
        const { id } = req.body;
        let product = await Product.findByIdAndDelete(id);
        return res.json(product);
        
    } catch (err) {
        return res.status(500).json({error:err.message});
    }
})

module.exports = adminRouter;
