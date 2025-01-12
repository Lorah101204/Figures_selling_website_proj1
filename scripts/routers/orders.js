const {Order} = require('../models/order');
const {Item} = require('../models/item');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get(`/`, async (req, res) => {
	const orderList = await Order.find().populate('user', 'name')
	.populate('user', 'name')
	.populate({ path: 'orderItems', populate: 'product' });

	if (!orderList) {
		res.status(500).json({success: false});
	}
	res.send(orderList);
})

router.get(`/:id`, async (req, res) => {
	const orderList = await Order.findById(req.params.id)
	.populate('user', 'name')
	.populate({ path: 'orderItems', populate: 'product' });

	if (!orderList) {
		res.status(500).json({success: false});
	}
	res.send(orderList);
})

router.post('/', async (req, res) => {
	const orderItemsIds = Promise.all(req.body.orderItems.map(async(orderitem) => {
		let newOrderItem = new Item({
			quantity: orderitem.quantity,
			product: orderitem.product
		})

		newOrderItem = await newOrderItem.save();

		return newOrderItem._id;
	}))

	const orderItemsIdsResolved = await orderItemsIds;
	//console.log(orderItemsIdsResolved);

	const prices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
		const orderItem = await Item.findById(orderItemId).populate('product', 'price');
		const price = orderItem.product.price * orderItem.quantity;
		return price;
	}));

	const price = prices.reduce((a, b) =>  a + b, 0);
	console.log(price);

	let order = new Order({
		orderItems: orderItemsIdsResolved,
		user: req.body.user,
		zipcode: req.body.zipcode,
		city: req.body.city,
		country: req.body.country,
		price: price,
		phone: req.body.phone,
	})
	order = await order.save();

	if (!order) return res.status(404).send('cannot create order');

	res.send(order);
})

router.put('/:id', async (req, res) => {
	if (!mongoose.isValidObjectId(req.params.id)) {
		res.status(400).send('Invalid Order ID')
	}

	const order = await Order.findByIdAndUpdate(req.params.id, {
		status: req.body.status
	}, { new: true });

	if (!order) return res.status(404).send('cant be updated');

	res.send(order);
})

router.delete('/:id', (req, res) => {
	Order.findByIdAndDelete(req.params.id).then(async order =>{
		if (order) {
			await order.orderItems.map(async orderitem => {
				await Item.findByIdAndDelete(orderitem);
			})
			return res.status(200).json({success: true, message: 'the order is deleted!'})
		} else {
			return res.status(404).json({success: false , message: "order not found!"})
		}
	}).catch(err=>{
	   return res.status(500).json({success: false, error: err}) 
	})
})

router.get('/get/totalsales', async (req, res) => {
	const totalSales = await Order.aggregate([
		{ $group: {_id: null, totalsales: { $sum: '$price' }}}
	])

	if (!totalSales) {
		return res.status(400).send('the order sales cannot be generated');
	}

	res.send({totalsales: totalSales.pop().totalsales});
})

router.get(`/get/count`, async (req, res) => {
	const orderCount = await Order.countDocuments();

	if (!orderCount) {
		res.status(500).json({success: false});
	}
	res.send({
		orderCount: orderCount,
	});
})

router.get(`/get/userorders/:userid`, async (req, res) => {
	const userOrderList = await Order.find({user: req.params.userid}).populate({
			path: 'orderItems',
			populate: {
				path: 'product',
				populate: 'category'
			}
		}).sort({'dateOrdered': -1});

	if (!userOrderList) {
		res.status(500).json({success: false});
	}
	res.send(userOrderList);
})

module.exports = router;