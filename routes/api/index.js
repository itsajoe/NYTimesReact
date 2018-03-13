const router = require("express").Router();
const bookRoutes = require("./article");

// Book routes
router.use("/article", bookRoutes);

module.exports = router;
