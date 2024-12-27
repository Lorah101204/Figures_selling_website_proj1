const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
	/*
	order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Order',
		required: true,
	},
	*/
	product: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	}
})

itemSchema.virtual('id').get(function() {
	return this._id.toHexString();
});

itemSchema.set('toJSON', {
	virtuals: true,
});

exports.Item = mongoose.model('Item', itemSchema);