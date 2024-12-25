const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

router.post('/login', async(req, res) => {
	const user = await User.findOne({email: req.body.email}) || await User.findOne({username: req.body.username});
	const secret = process.env.SECRET;

	if (!user) return res.status(400).send('User not found');

	if (user && bcrypt.compareSync(req.body.password, user.password)) {
		const token = jwt.sign(
			{
				userId: user.id,
				is_admin: user.is_admin
			},
			secret,
			{expiresIn: '1d'}
		);

		res.status(200).send({user: user.email, token: token});
	}
	else res.status(400).send('Wrong password');
})

router.post('/register', async (req, res) => {
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

router.get(`/get/count`, async (req, res) => {
	const userCount = await User.countDocuments();

	if (!userCount) {
		res.status(500).json({success: false});
	}
	res.send({
		userCount: userCount,
	});
})

module.exports = router;