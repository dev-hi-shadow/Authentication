const { verifyAuthToken } = require("../middlewares");

const router = require("express").Router();

router.use("/auth", require("../modules/users/auth_routes"));


router.use(verifyAuthToken);
router.use("/roles", require("../modules/roles/index"));
router.use("/users", require("../modules/users/index"));

module.exports = router;
