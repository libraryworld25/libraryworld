const Users = require("../models/Users.js");

const getUserInfo = async (req, res) => {
    const userId = req.user.id;
    try {
        let userData = await Users.findById(userId);
        res.status(200).json({
            image: userData.image,
            name: userData.name,
            username: userData.username,
            email: userData.email
        })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = getUserInfo;