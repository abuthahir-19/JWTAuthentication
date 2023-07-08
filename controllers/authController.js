const User = require ('../model/User');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne ({ email: username }).exec();
    if (!foundUser) return res.status (400).json ({ message : "No user exists. Please register with us !" });
    const match = await bcrypt.compare (password, foundUser.password);
    // console.log (foundUser);
    if (match) {
        const accessToken = jwt.sign (
            { "username" : foundUser.email },
            process.env.ACCESS_TOKEN,
            { expiresIn : '60s'}
        );

        const refreshToken = jwt.sign (
            { "username" : foundUser.email },
            process.env.REFRESH_TOKEN,
            { expiresIn : '1d'}
        );
        
        foundUser.refreshToken = refreshToken;

        await User.findOneAndUpdate ( { email: username }, foundUser);
        res.cookie ('jwt', refreshToken, { httpOnly: true });
        res.json ({ accessToken });
    } else {
        return res.status (400).json ({ message : "Check with your credentials !" });
    }
};

module.exports = handleLogin;