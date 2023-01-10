const jwt = require("jsonwebtoken");
const User = require("./userModel");

exports.createAccount = async (req, res) => {
	try {
		await User.create(req.body);
		res.status(201).send({
			success: true,
			message: `User with username ${req.body.username} has been successfully created `
		});
	} catch (error) {
		console.log(error);
		// send internal error status and the error message
		res.status(400).send({ success: false, error: error.message });
	}
};

exports.readUsers = async (req, res) => {
	try {
		const users = await User.find(req.body);
		res.status(200).send({ users: users });
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: error.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await User.deleteOne({ username: req.body.username });
		res.status(202).send({
			message: `${req.body.username} has been deleted`
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: error.message });
	}
};

exports.loginUser = async (req, res) => {
	try {
		if (req.authUser) {
			console.log("token check passwed and continue to persistant login");
			res.staus(200).send({ username: req.authUser.username });
		}
		const token = await jwt.sign({ id_: req.user._id }, process.env.SECRET);
		res.status(200).send({ username: req.user.username, token });
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: error.message });
	}
};

exports.updateDetails = async (req, res) => {
	try {
		// define the filter
		const filter = { username: req.body.username };
		// define the field that is being updated
		const update = { [req.body.field]: req.body.value };

		let updatedUser = await User.findOneAndUpdate(filter, update, {
			new: true // returns the updated values
		});
		console.log(updatedUser);
		res.status(200).send({
			message: `the ${req.body.field} has been updated to ${req.body.value}`
		});
	} catch (error) {
		console.log(error);
		// send internal error status and the error message
		res.status(400).send({ success: false, error: error.message });
	}
};
