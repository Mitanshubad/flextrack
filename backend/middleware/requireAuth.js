const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Assuming you have a model named 'userModel'

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        
        return res.status(401).json({ error: 'authorization failed' }); // Corrected the syntax here
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "request not authorized" }); // Corrected the error message here
    }
};

module.exports = requireAuth;


