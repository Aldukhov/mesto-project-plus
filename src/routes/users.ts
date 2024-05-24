import { Router } from "express";
import {
  findAllUsers,
  findMe,
  findUserById,
  updateUserAvatar,
  updateUserInfo,
} from "../controllers/users";

const router = Router();

router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.patch("/me", updateUserInfo);
router.patch("/me/avatar", updateUserAvatar);
router.get("/me", findMe);

export default router;
