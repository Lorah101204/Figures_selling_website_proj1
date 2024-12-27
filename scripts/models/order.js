const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
	orderItems: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item',
		required: true,
	}],
	user: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true 
	},
	zipcode: { 
		type: String, 
		required: true 
	},
	city: String,
	country: String,
	price: Number,
	phone: {
		type: String,
		required: true
	},
	dateOrdered: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		required: true,
		default: 'Pending'
	}
})

orderSchema.virtual('id').get(function() {
	return this._id.toHexString();
});

orderSchema.set('toJSON', {
	virtuals: true,
});

exports.Order = mongoose.model('Order', orderSchema);