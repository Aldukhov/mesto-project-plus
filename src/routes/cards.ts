import { Router, Request, Response } from 'express';
import { findAllCards, createCard, deleteCardById, addLikeById, deleteLikeById } from '../controllers/cards';

const router = Router();
router.get('/', findAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', addLikeById);
router.delete('/:cardId/likes', deleteLikeById);

export default router;