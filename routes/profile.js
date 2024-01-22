const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/user"); // Import the User model

router.get("/", auth, async (req, res) => {
    try {
        // Access the user email from req.user
        const userEmail = req.user.email;

        // Fetch user details from the database based on the email using the User model
        const user = await User.findOne({ email: userEmail }).select("-password");

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Respond with the user details
        res.status(200).send({ data: user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
