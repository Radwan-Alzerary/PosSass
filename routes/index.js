const { requireAuth } = require("../middleware/authentication");

const router = require("express").Router();
const isfulladmin = require("../config/auth").isfulladmin;
const isCashire = require("../config/auth").isCashire;
const ensureAuthenticated = require("../config/auth").userlogin;

// router.use("/admin", require("./users"));
router.use("/", require("./routes"));
// router.use("/food",ensureAuthenticated, require("./food"));
router.use("/cashier",requireAuth, require("./cashier"));
router.use("/category",requireAuth, require("./category"));
router.use("/table", requireAuth, require("./table"));
router.use("/storge",requireAuth, require("./storge"));
// router.use("/delevery",ensureAuthenticated, require("./delevery"));
// router.use("/purchases", ensureAuthenticated, require("./purchases"));
router.use("/invoice",requireAuth, require("./invoice"));
router.use("/dashboard",requireAuth, require("./dashboard"));
router.use('/auth',requireAuth, require('./authRoutes'));

router.use("/custemer", requireAuth, require("./custemer"));
router.use("/debt", requireAuth, require("./debt"));
router.use("/setting", requireAuth, require("./setting"));
router.use("/devices",requireAuth, require("./devices"));
router.use("/report",requireAuth, require("./report"));

module.exports = router;
