const express = require("express");
var router = express();
const bodyparser = require("body-parser");
router.use(bodyparser.json());
const user = require("../controller/chat.controller");

router.post("/add", user.addUser);
router.get("/view/", user.getUser);

module.exports = router;
