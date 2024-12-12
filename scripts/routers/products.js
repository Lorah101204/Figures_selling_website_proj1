const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
	const productList = await Product.find();

	if (!productList) {
		res.status(500).json({success: false});
	}
	res.send(productList);
})

router.post(`/`, (req, res) => {
	const product = new Product({
		name: req.body.name,
		image: req.body.image,
		quantity: req.body.quantity, 
		price: req.body.price,
		category: req.body.category,
		desc: req.body.category,
		type: req.body.type
	});

	product.save().then(createdProduct => {
		res.status(201).json(createdProduct);
	}).catch(err => {
		res.status(500).json({
			error: err,
			success: false
		})
	})
	res.send(product);
})

module.exports = router;