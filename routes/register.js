const express = require ('express');
const router = express.Router();
const createNewUser = require ('../controllers/registerController');

router.get ('/', (req, res) => {
    res.send ("Sending register page !");
});

router.post ('/', createNewUser);
 
module.exports = router;