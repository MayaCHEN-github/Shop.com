
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');
const secretKey = 'shopdotcom';

const authenticateToken = (req, res, next) => {
    const token = req.headers.['x-access-token']?.split(' ')[1];
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {

                console.log(JSON.stringify(err));
                return res.status(500).json({
                    isLoggedIn: false,
                    message: "Failed authentication."
                });
            }
            req.user = {
                user_id: decoded.user_id,
                username: decoded.username
            };

            console.log(JSON.stringify(req.user));
            next();
        });
    } else {
        return res.status(401).json({ error: 'Authentication failed, token not provided.' });
    }
};

export default authenticateToken;