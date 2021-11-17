import { Router } from 'express';
import expressCallback from '../helper/express-callback.js';
import controller from '../controllers/characters/index.js';

const router = Router();

router.get('/', expressCallback(controller.getCharacters));
router.get('/:id', expressCallback(controller.getCharacterById));

export default router;
