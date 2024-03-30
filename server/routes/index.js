const { Router } = require("express");

const router = Router();

router.use("/api/v1/users", require("./user.route"));
router.use("/api/v1/auth", require("./auth.route"));
router.use("/api/v1/categories", require("./category.route"));
router.use("/api/v1/sub-category", require("./sub-category.route"));
router.use("/api/v1/brand", require("./brand.route"));

module.exports = router;
