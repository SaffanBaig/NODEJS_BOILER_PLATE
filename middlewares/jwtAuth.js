const jwt = require('jsonwebtoken');
require('dotenv').config();

// Private URLS
const withAuth = (roles) => {
    return (req, res, next) => {
        const token = req.header('x-auth-token');

        if (!token) {
            res.sendStatus(401);
        }
        try {
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (roles.indexOf(decoded.role) == -1) {
                return res.sendStatus(403)
            }
            req.user = decoded.user;
            next();
        } catch (err) {
            return res.sendStatus(403)
        }

    }
}

// Public URLS
const withOutAuth = (req, res, next) => {
    next();
}

// Generate Token
const sign = (params) => {
    return jwt.sign(params, process.env.JWT_SECRET, {expiresIn: '14d'})
}

// Verify Token
const verify = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {withAuth, withOutAuth, verify, sign};