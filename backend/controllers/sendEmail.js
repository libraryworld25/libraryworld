const sendEmailFn = require('../functions/sendEmailFn.js');
const Users = require('../models/Users.js')

const sendEmail = async (req, res) => {
    const { email, subject, msg, type, username } = req.body;
    try {
        if (type === "signup") {
            const doesEmailExist = await Users.findOne({ email });

            if (doesEmailExist) {
                return res.status(409).json({ message: 'Email already in use.' }); // Return added
            }

            const doesUserExist = await Users.findOne({ username });

            if (doesUserExist) {
                return res.status(409).json({ message: 'Username already taken.' }); // Return added
            }
        }

        if (type === "forget") {
            const doesEmailExist = await Users.findOne({ email });

            if (!doesEmailExist) {
                return res.status(409).json({ message: 'Email is not registered.' }); // Return added
            }
        }


        await sendEmailFn({ email, subject, msg })
            .then(() => {
                res.status(200).json({
                    message: "Message sent successfully",
                })
            })
            .catch(() => {
                console.log(error);
                return res.status(500).json({
                    error: "Failed to send message"
                })
            })
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }

}

module.exports = sendEmail;