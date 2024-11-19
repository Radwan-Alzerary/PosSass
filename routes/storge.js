const router = require("express").Router();
const Storge = require("../models/storge");
const Food = require("../models/food");
const multer = require("multer");
const fs = require("fs");
const User = require("../models/user");
const SystemSetting = require("../models/systemSetting");
const isfulladmin = require("../config/auth").isfulladmin;
const ensureAuthenticated = require("../config/auth").userlogin;

// Set up multer storage engine for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/foodimg");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, uniqueSuffix + "." + extension);
  },
});

// Create multer instance for uploading image
const upload = multer({ storage: storage });
router.get("/", async (req, res) => {
  const user = await User.findById(req.userId);

  const systemSetting = await SystemSetting.findOne({specialId:user.systemId});

  const storge = await Storge.find({systemId:user.systemId});
  res.render("storge", { storge, role: user.role,systemSetting });
});

router.get("/item", async (req, res) => {
  const user = await User.findById(req.userId);

  const systemSetting = await SystemSetting.findOne({specialId:user.systemId});

  const product = await Food.find({ deleted: false,systemId:user.systemId }).sort({ name: 1 });


  res.render("itemStorge", { product, role: user.role ,systemSetting});
});

module.exports = router;
