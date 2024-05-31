import { Router } from "express";
import {
  findAllCards,
  createCard,
  deleteCardById,
  addLikeById,
  deleteLikeById,
} from "../controllers/cards";
import {
  validateCreateCard,
  validateUpdateCard,
  validateCardId,
} from "../utils/valid";
import { checkValid } from "../utils/checkValid";

const router = Router();
router.get("/", findAllCards);
router.post("/", validateCreateCard, checkValid, createCard);
router.delete("/:cardId", validateCardId, checkValid, deleteCardById);
router.put("/:cardId/likes", validateCardId, checkValid, addLikeById);
router.delete("/:cardId/likes", validateCardId, checkValid, deleteLikeById);

export default router;
