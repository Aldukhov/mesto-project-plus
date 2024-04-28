import { Router, Request, Response } from 'express';
import { createUser, findAllUsers, findUserById, upDateUserAvatar, upDateUserInfo } from '../controllers/users'

const router = Router();
router.get('/', findAllUsers);
router.get('/:id', findUserById);
router.post('/', createUser);
router.patch('/me', upDateUserInfo);
router.patch('/me/avatar', upDateUserAvatar);

export default router;