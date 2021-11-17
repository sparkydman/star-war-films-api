import { Router } from 'express';
import expressCallback from '../helper/express-callback.js';
import controller from '../controllers/comments/index.js';

const router = Router();

router.get('/film/:film_id', expressCallback(controller.getComments));
router.get('/:id', expressCallback(controller.getComment));
router.get('/', expressCallback(controller.getAllComments));
router.delete('/:id', expressCallback(controller.deleteComment));
router.post('/', expressCallback(controller.addComment));

export default router;
