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

exports.deleteUser = async (req, res) => {
    try{
        await User.deleteOne({username: req.body.username});
        res.status(202).send({message: `${req.body.username} has been deleted`});
    } catch(error){
        console.log(error);
        res.status(500).send({error: error.message});
    }
}