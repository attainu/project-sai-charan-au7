import express from "express";
const router = express.Router();
import {
  getUserById,
  follow,
  unfollow,
  updatebanner,
  updateprofilepic,
  search,
  getFollowers,
} from "../controllers/user.js";
import RequireLogin from "../middlewares/RequireLogin.js";

router.get("/user/:id", RequireLogin, getUserById);
router.get("/followers", RequireLogin, getFollowers);
router.put("/follow", RequireLogin, follow);
router.put("/unfollow", RequireLogin, unfollow);
router.put("/updatebanner", RequireLogin, updatebanner);
router.put("/updateprofilepic", RequireLogin, updateprofilepic);
router.post("/search", RequireLogin, search);

export { router };
