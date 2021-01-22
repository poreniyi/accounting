var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    res.json("json test for user api");
});

module.exports = router;