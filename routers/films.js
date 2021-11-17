import { Router } from 'express';
import expressCallback from '../helper/express-callback.js';
import controller from '../controllers/films/index.js';

const router = Router();

router.get('/', expressCallback(controller.getFilms));
router.get('/:id', expressCallback(controller.getFilmById));

export default router;
