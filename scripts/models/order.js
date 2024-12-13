const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
	user: { 
		type: mongoose.Schema.Types.ObjectId, 
		required: true 
	},
	zipcode: { 
		type: String, 
		required: true 
	},
	city: String,
	country: String,
})

orderSchema.virtual('id').get(function() {
	return this._id.toHexString();
});

orderSchema.set('toJSON', {
	virtuals: true,
});

exports.Order = mongoose.model('Order', orderSchema);