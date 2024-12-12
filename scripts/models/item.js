const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
	order_id: String,
	product_id: String,
	quantity: Number,
})

exports.Item = mongoose.model('Item', itemSchema);