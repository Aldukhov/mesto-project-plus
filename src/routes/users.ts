import { Router } from "express";
import {
  findAllUsers,
  findMe,
  findUserById,
  updateUserAvatar,
  updateUserInfo,
} from "../controllers/users";

import {
  validateUpdateUserAvatar,
  validateUpdateUserInfo,
  validateUserId,
} from "../utils/valid";
import { checkValid } from "../utils/checkValid";

const router = Router();

router.get("/", findAllUsers);
router.get("/:id", validateUserId, checkValid, findUserById);
router.patch("/me", validateUpdateUserInfo, checkValid, updateUserInfo);
router.patch(
  "/me/avatar",
  validateUpdateUserAvatar,
  checkValid,
  updateUserAvatar
);
router.get("/me", findMe);

export default router;
