const express = require ('express');
const router = express.Router();
const handleLogin = require ('../controllers/authController');

router.get ('/', (req, res) => {
    res.send ("sending authentication front-end !");
});

router.post ('/', handleLogin);

module.exports = router;