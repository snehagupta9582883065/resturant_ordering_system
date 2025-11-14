const jwt = require('jsonwebtoken');

const JWT_SECRET = 'myRestaurantSecretKey'; 

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'Access denied. No authentication token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); 

        req.user = decoded.user; 
        
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is invalid or expired.' });
    }
};