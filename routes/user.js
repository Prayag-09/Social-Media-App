const router = require('express').Router();

router.get('/' , (req,res) => {
    res.send("Now in User Routes")
})

module.exports = router;