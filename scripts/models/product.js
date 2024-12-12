const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
	name: { 
		type: String, 
		required: true 
	},
	image: String,
	quantity: { 
		type: Number, 
		default: 0, 
		min: 0 
	},
	price: Number,
	category: {
		type: mongoose.Schema.Types.ObjectID,
		ref: 'Category',
		required: true,
	},
	desc: String,
	type: String,
})

exports.Product = mongoose.model('Product', productSchema);