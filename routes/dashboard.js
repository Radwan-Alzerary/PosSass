const router = require("express").Router();
const Category = require("../models/category");
const Food = require("../models/food");
const multer = require("multer");
const User = require("../models/user");
const SystemSetting = require("../models/systemSetting");


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
  console.log(req.userId);
  const user = await User.findById(req.userId);
  const systemSetting = await SystemSetting.findOne({specialId:user.systemId});
  console.log("systemSetting",systemSetting)
  const category = await Category.find({specialId:user.systemId}).populate("foods");
  const food = await Food.find({
    specialId:user.systemId,
    quantety: { $gte: 0, $lte: 5 },
    unlimit: false,
    deleted:false
  });
res.render("dashboard", { category, food, role: user.role,systemSetting });
});

module.exports = router;
