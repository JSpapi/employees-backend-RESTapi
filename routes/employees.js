const express = require("express");
const router = express.Router();
const {
  getAll,
  add,
  remove,
  edit,
  getUniq,
} = require("../controllers/employeesController");
const { auth } = require("../middleware/auth");

router.get("/", auth, getAll);
router.get("/:id", auth, getUniq);
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;
