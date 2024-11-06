const { getProfile, verifyEmail } = require("./controller");

const router = require("express").Router();

router.route("/profile").get(getProfile);
router.route("/").put(verifyEmail);

module.exports = router;
