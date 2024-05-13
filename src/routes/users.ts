import { Router} from 'express';
import {findAllUsers, findMe, findUserById, upDateUserAvatar, upDateUserInfo } from '../controllers/users'

const router = Router();

router.get('/', findAllUsers);
router.get('/:id', findUserById);
router.patch('/me', upDateUserInfo);
router.patch('/me/avatar', upDateUserAvatar);
router.get('/me', findMe);

export default router;