const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
	user_id: { 
		type: String, 
		required: true 
	},
	zipcode: { 
		type: String, 
		required: true 
	},
	city: String,
	country: String,
})

exports.Order = mongoose.model('Order', orderSchema);