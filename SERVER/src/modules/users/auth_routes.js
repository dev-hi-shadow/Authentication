const { registration, login } = require("./controller");

const router = require("express").Router();

router.route("/signup").post(registration);
router.route("/admin/signup").post(registration);
router.route("/signin").post(login);
router.route("/admin/signin").post(login);

module.exports = router;
