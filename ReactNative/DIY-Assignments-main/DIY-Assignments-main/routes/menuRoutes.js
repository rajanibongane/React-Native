const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const {
  getAllMenu,
  addMenu,
  putMenu,
} = require("../controller/menuController");

router.use(validateToken);
router.route("/").post(addMenu);
router.route("/filter").get(getAllMenu);
router.route("/:date").put(putMenu);

//To get menus for the present week:

module.exports = router;
