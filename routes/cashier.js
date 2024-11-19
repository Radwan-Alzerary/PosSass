const router = require("express").Router();
const Category = require("../models/category");
const Food = require("../models/food");
const SystemSetting = require("../models/systemSetting");
const Table = require("../models/table");
const User = require("../models/user");
const isfulladmin = require("../config/auth").isfulladmin;
const isCashire = require("../config/auth").isCashire;
const ensureAuthenticated = require("../config/auth").userlogin;
const Setting = require("../models/pagesetting");

router.get("/", async (req, res) => {
  const category = await Category.find().populate("foods");
  const user = await User.findById(req.userId);
  const systemSetting = await SystemSetting.findOne({specialId:user.systemId});
  const table = await Table.find({systemId:user.systemId}).sort({ number: 1 }); // Sort the tables by number in ascending order
  console.log(category);
  res.render("cashier-table", {
    category,
    table,
    role: user.role,
    systemSetting: systemSetting,
  });
});

router.get("/getTable", async (req, res) => {
  const user = await User.findById(req.userId);

  const table = await Table.find({systemId:user.systemId}).sort({ number: 1 }); // Sort the tables by number in ascending order
  res.json(table);
});

router.get("/menu/", async (req, res) => {
  let tableid = req.query.tableid || "_id";
  const systemSetting = await SystemSetting.findOne();

  // const table = await Table.findById(tableid).populate("invoice");
  const user = await User.findById(req.userId);
  const table = await Table.find({systemId:user.systemId});

  const setting = await Setting.findOne({systemId:user.systemId})
  const category = await Category.find({systemId:user.systemId}).populate("foods");
  console.log(category);

  res.render("cashier-food", { category, table, tableid, role: user.role, systemSetting: systemSetting,setting:setting });
});

router.get("/getCategory/", async (req, res) => {
  const user = await User.findById(req.userId);

  const category = await Category.find({systemId:user.systemId}).populate({
    path: "foods",
    match: { active: true },
  });
  console.log(category);

  res.json( category );
});


module.exports = router;
