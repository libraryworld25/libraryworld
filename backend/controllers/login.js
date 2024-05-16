const Users = require('../models/Users.js');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await Users.findOne({ email });

        if (!userExist) {
            return res.status(500).json({ message: 'Invalid Credentials' })
        }

        // If user exists, check the password
        const isPasswordValid = await userExist.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong password" })
        }

        res.status(200).json({
            message: "Login successfull",
            token: await userExist.generateToken()
        })

    } catch (error) {
        console.log('Error in login controller: ', error);
        return res.status(500).json({ error: 'Server Internal Error' });
    }

}

module.exports = login;