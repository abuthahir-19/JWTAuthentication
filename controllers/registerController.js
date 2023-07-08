const User = require ('../model/User');
const bcrypt = require ('bcrypt');

const createNewUser = async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    console.log ("Register route : " , req.body)
    const existence = await User.findOne ({ email, phone }).exec();
    if (existence) return res.status (201).json ({ message : "email already exists. Please sign in !!" });

    const hashed = await bcrypt.hash (password, 10);
    await User.create ({
        firstName : firstName, 
        lastName : lastName,
        email : email,
        password : hashed,
        phone : phone,
    });

    return res.status (200).json ({ message : "User created Successfully ! "});
};

module.exports = createNewUser;