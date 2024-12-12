const {Item} = require('../models/item');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
	const itemList = await Item.find();

	if (!itemList) {
		res.status(500).json({success: false});
	}
	res.send(itemList);
})

module.exports = router;