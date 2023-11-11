const router = require('express').Router();

router.get('/' , (req,res) => {
    res.send("Now in Auth Routes")
})

module.exports = router;