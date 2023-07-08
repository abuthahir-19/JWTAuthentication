const User = require ('../model/User');
const jwt = require ('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) res.status (400).json ({ message : "Bad request"});
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne ({ refreshToken }).exec();
    if (!foundUser) return res.status (403).json ({ message : "Access restricted !" });
    jwt.verify (
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.username) return res.status (403).json ({ message : "Access denied !" });
            const accessToken = jwt.sign (
                { "username" : foundUser.email },
                process.env.ACCESS_TOKEN,
                { expiresIn : '60s' }
            );
            res.json ({ accessToken });
        }
    );
}

module.exports = handleRefreshToken;