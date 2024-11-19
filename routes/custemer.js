const Customer = require("../models/costemer");
const User = require("../models/user");
const router = require("express").Router();

router.get("/getall", async (req, res) => {
  const user = await User.findById(req.userId);

  const custemer = await Customer.find({systemId:user.systemId});
  res.json(custemer);
});

router.get("/getbyname/:searchName", async (req, res) => {
  const searchName = req.params.searchName;
  const user = await User.findById(req.userId);

  try {
    const patients = await Customer.find({
      name: { $regex: searchName, $options: "i" },
      systemId:user.systemId
    })
      .sort({ updatedAt: -1 }) // Sort by 'updatedAt' field in descending order
      .limit(10);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
