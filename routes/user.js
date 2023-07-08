const express = require ('express');
const router = express.Router();

router.get ('/', (req, res) => {
    res.status (200).json ({ message : "User Home page !"});
});

module.exports = router;