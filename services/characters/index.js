import getCharacters from './get-characters.js';
import getCharacterById from './get-character-by-id.js';

export default Object.freeze({
  getCharacters: getCharacters(),
  getCharacterById: getCharacterById(),
});
