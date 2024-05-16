const Users = require("../models/Users.js");

const updateUserInfo = async (req, res) => {
    const id = req.user.id;
    const { name, username, orgData } = req.body;

    try {

        if (username !== orgData.username) {

            const doesUserExist = await Users.findOne({ username })

            if (doesUserExist) {
                return res.status(409).json({ message: "Username taken." })
            }

        }

        const result = await Users.updateOne({ _id: id }, { name, username });

        if (result && result.nModified === 1) {
            return res.status(200).json({ message: "Profile updated successfully." });
        } else {
            return res.status(501).json({ message: "Error updating profile" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Internal Error" });
    }
}

module.exports = updateUserInfo;
