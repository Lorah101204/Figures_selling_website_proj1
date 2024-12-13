const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get(`/`, async (req, res) => {
	const userList = await User.find().select('-password');

	if (!userList) {
		res.status(500).json({success: false});
	}
	res.send(userList);
})

router.get(`/:id`, async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (!user) {
		res.status(500).send('There is no such user');
	}
	res.send(user);
})

router.post('/', async (req, res) => {
	let user = new User({
		name: req.body.name,
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 10),
		email: req.body.email,
		phone: req.body.phone,
		is_admin: req.body.is_admin,
		zipcode: req.body.zipcode,
		city: req.body.city,
	});

	user = await user.save();

	if (!user) return res.status(404).send('cannot create user');

	res.send(user);
})

module.exports = router;