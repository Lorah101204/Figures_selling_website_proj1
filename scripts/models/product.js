const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
	is_featured: {
		type: Boolean,
		default: false,
	},
	desc: String,
	type: String,
})

productSchema.virtual('id').get(function() {
	return this._id.toHexString();
});

productSchema.set('toJSON', {
	virtuals: true,
});

exports.Product = mongoose.model('Product', productSchema);