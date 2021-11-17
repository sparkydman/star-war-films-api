import getFilmById from './get-film-by-id.js';
import getFilms from './get-films.js';

export default Object.freeze({
  getFilms: getFilms(),
  getFilmById: getFilmById(),
});
