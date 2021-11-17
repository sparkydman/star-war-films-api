import filmService from '../../services/films/index.js';
import getFilmById from './get-film-by-id.js';
import getFilms from './get-films.js';

export default Object.freeze({
  getFilms: getFilms({ getFilms: filmService.getFilms }),
  getFilmById: getFilmById({ getFilmById: filmService.getFilmById }),
});
