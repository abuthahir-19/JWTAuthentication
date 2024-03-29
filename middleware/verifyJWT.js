const jwt = require ('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization ;
    if (!authHeader?.startsWith ('Bearer')) return res.status (401);
    const token = authHeader.split(' ')[1];
    jwt.verify (
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.status (403).json ({ message : "Invalid user !!" });
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT;