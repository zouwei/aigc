import { Router } from 'express';
import { getUsers, getUserById, createUser } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

export default router;
