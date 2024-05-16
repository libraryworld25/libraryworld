const Users = require('../models/Users.js');

const signup = async (req, res) => {
    const { email, password, name, username } = req.body;

    try {
        let userCreated = await Users.create({ name, email, password, username });

        const token = await userCreated.generateToken();

        return res.status(200).json({
            msg: 'Account created successfully.',
            token
        });

    } catch (error) {
        console.error('Error in signup:', error);
        return res.status(500).json({ error: 'Internal Server Error' }); // Return added
    }
}

module.exports = signup;
