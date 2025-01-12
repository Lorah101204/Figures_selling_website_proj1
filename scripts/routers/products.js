const {Product} = require('../models/product');
const {Category} = require('../models/category');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const router = express.Router();

const FILE_TYPE_MAP = {
	'image/png' : 'png',
	'image/jpeg' : 'jpeg',
	'image/jpg' : 'jpg'
};

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, '../Image');
	},
	filename: function(req, file, cb) {
		const fileName = file.originalName.split(' ').join('-');
		cb(null, fileName + '-' + Date.now());
	}
})

const uploadOptions = multer({ storage: storage });

// GET
router.get(`/`, async (req, res) => {
	let filter = {};

	if (req.query.categories)
		filter = {category: req.query.categories.split(',')};

	const productList = await Product.find(filter).populate('category');

	if (!productList) {
		res.status(500).json({success: false});
	}
	res.send(productList);
})

router.get(`/:id`, async (req, res) => {
	const product = await Product.findById(req.params.id).populate('category');

	if (!product) {
		res.status(500).json({success: false});
	}
	res.send(product);
})

router.get(`/get/count`, async (req, res) => {
	const productCount = await Product.countDocuments();

	if (!productCount) {
		res.status(500).json({success: false});
	}
	res.send({
		productCount: productCount,
	});
})

router.get('/get/featured/:count', async (req, res) => {
	const count = req.params.count ? req.params.count : 0;
	const products = await Product.find({ is_featured: true }).limit(+count);

	if (!products)
		res.status(500).send({success: false});
	res.send(products);
})

// POST
router.post(`/`, uploadOptions.single('image'), async (req, res) => {
	const category = await Category.findById(req.body.category);
	if (!category) return res.status(404).send('Invalid category');

	const fileName = req.file.fileName;
	const basePath = `${req.protocol}://${req.get('host')}/pulic/products`;

	let product = new Product({
		name: req.body.name,
		image: `${basePath}${fileName}`,
		quantity: req.body.quantity, 
		price: req.body.price,
		category: req.body.category,
		desc: req.body.desc,
		type: req.body.type
	});

	product = await product.save();

	if (!product) return res.status(500).send('cannot create product');
	res.send(product);
})

// PUT
router.put('/:id', async (req, res) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		res.status(400).send('Invalid Product ID')
	}

	const category = await Category.findById(req.body.category);
	if (!category) return res.status(404).send('Invalid category');

	const product = await Product.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		image: req.body.image,
		quantity: req.body.quantity, 
		price: req.body.price,
		category: req.body.category,
		is_featured: req.body.is_featured,
		desc: req.body.desc,
		type: req.body.type
	}, { new: true });

	if (!product) return res.status(404).send('cant be updated');

	res.send(product);
})

// DELETE
router.delete('/:id', (req, res) => {
	Product.findByIdAndDelete(req.params.id).then(product =>{
		if (product) {
			return res.status(200).json({success: true, message: 'the product is deleted!'})
		} else {
			return res.status(404).json({success: false , message: "product not found!"})
		}
	}).catch(err=>{
	   return res.status(500).json({success: false, error: err}) 
	})
})

module.exports = router;