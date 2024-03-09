const { Router } = require("express");

const router = Router();

router.use("/api/v1/users", require("./user.route"));

module.exports = router;
