const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
	order: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	product: { 
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	quantity: Number,
})

itemSchema.virtual('id').get(function() {
	return this._id.toHexString();
});

itemSchema.set('toJSON', {
	virtuals: true,
});

exports.Item = mongoose.model('Item', itemSchema);