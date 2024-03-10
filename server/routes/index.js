const { Router } = require("express");

const router = Router();

router.use("/api/v1/users", require("./user.route"));
router.use("/api/v1/auth", require("./auth.route"));

module.exports = router;
