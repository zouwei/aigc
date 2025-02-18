import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();
// 测试方法
router.get('/ai', userController.ai);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);



export default router;
