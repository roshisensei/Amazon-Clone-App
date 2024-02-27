const express = require('express');
const {Product} = require('../models/product');
const auth = require('../middlewares/auth');
const productRouter = express.Router();

// get products by category
productRouter.get('/api/product',auth, async(req, res)=>{
    try{
        const products = await Product.find({category:req.query.category});
        return res.json(products);
    }catch(err){
        return res.status(500).json({error:err.message});
    } 
});

// get products by searchQuery

productRouter.get('/api/products/search/:name',auth, async(req,res)=>{
    try{
        const product = await Product.find({name:{$regex:req.params.name, $options:'i'},},);
        return res.json(product);
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}
);

// rating of a product

productRouter.post('/api/rate-product', auth, async(req, res)=>{
    try {
        const {id, rating} = req.body;
        let product =await Product.findById(id);

        for(let i=0;i<product.rating.length;i++){
            if(product.rating[i].userId == req.user){
                product.rating.splice(i,1);
                break;
            }
        }

        const ratingSchema ={
            userId:req.user,
            rating,
        }
        
        product.rating.push(ratingSchema);
        product = await product.save();
        return res.json(product);

    } catch (err) {
        return res.status(500).json({error:err.message});
    }
})

// get deal of the day

productRouter.get('/api/deal-of-day', auth, async(req, res)=>{
    try{
    let products = await Product.find({});

    products = products.sort((a, b) => {
      let aSum = 0;
      let bSum = 0;

      for (let i = 0; i < a.rating.length; i++) {
        aSum += a.rating[i].rating;
      }

      for (let i = 0; i < b.rating.length; i++) {
        bSum += b.rating[i].rating;
      }
      return aSum < bSum ? 1 : -1;
    });

    res.json(products[0]);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})

module.exports =productRouter;