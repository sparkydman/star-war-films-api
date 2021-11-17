import filmService from '../../services/characters/index.js';
import getCharacterById from './get-character-by-id.js';
import getCharacters from './get-characters.js';

export default Object.freeze({
  getCharacters: getCharacters({ getCharacters: filmService.getCharacters }),
  getCharacterById: getCharacterById({
    getCharacterById: filmService.getCharacterById,
  }),
});
