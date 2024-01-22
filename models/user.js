const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	phoneNumber:{type:String,required:true},
	email: { type: String, required: true },
	password: { type: String, required: true },
	
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id,email: this.email }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

// const validate = (data) => {
// 	// const phoneNumberRegex = /^(\+91[0-9]{10}|\d{1,3}[0-9]?\d{6,14}[0-9])$/;
// 	const schema = Joi.object({
// 		userName: Joi.string().required().label("First Name"),
// 		phoneNumber: Joi.string()
// 					  .required()
// 					  .label("phoneNumber")
// 		              .message("Please Enter a valid phone number"),
// 		email: Joi.string().email().required().label("Email"),
// 		password: passwordComplexity().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

const validate = (data) => {
    try {
        const schema = Joi.object({
            userName: Joi.string().required().label("First Name"),
            phoneNumber: Joi.string()
                .required()
                .label("phoneNumber")
                .message("Please Enter a valid phone number"),
            email: Joi.string().email().required().label("Email"),
            password: passwordComplexity().required().label("Password"),
        });

        const result = schema.validate(data);
        return result;
    } catch (error) {
        console.error("Validation Error:", error);
        throw error;
    }
};

module.exports = { User, validate };
