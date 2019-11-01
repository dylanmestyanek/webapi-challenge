const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Yo it's working!")
})

module.exports = router;