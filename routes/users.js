	const router = require("express").Router();
	const { User, validate } = require("../models/user");
	const bcrypt = require("bcrypt");

	router.post("/", async (req, res) => {

		try {
			console.log("first");
			// const { error } = validate(req.body);
		
			// if (error)
			// 	console.error("error details",error.details)
			// 	return res.status(400).send({ message: error.details[0].message });

			const user = await User.findOne({ email: req.body.email });
			console.log(req.body.email);
			

			if (user)
				return res
					.status(409)
					.send({ message: "User with given email already Exist!" });

			const salt = await bcrypt.genSalt(Number(process.env.SALT));
			const hashPassword = await bcrypt.hash(req.body.password, salt);
			console.log("Hashed Password:", hashPassword);

			await new User({ ...req.body, password: hashPassword }).save();
			res.status(201).send({ message: "User created successfully" });
		} catch (error) {
			console.log("hello here is the error");
			res.status(500).send({ message: "Internal Server Error" });
		}
	});

	module.exports = router;
