import joi from 'joi';
import sanitize from 'sanitize-html';
export default ({ text, commented_by = 'Anonymous', film_id, public_ip }) => {
  const schema = joi.object({
    text: joi.string().max(500).required(),
    commented_by: joi.string().trim().required(),
    film_id: joi.number().required(),
    public_ip: joi.string().required(),
  });

  const { error, value } = schema.validate({
    text,
    commented_by,
    film_id,
    public_ip,
  });

  if (error) {
    throw new Error(error.details[0].message);
  }

  return Object.freeze({
    text: sanitize(value.text),
    commented_by: sanitize(value.commented_by),
    film_id: value.film_id,
    commented_at: new Date().toUTCString(),
    public_ip: value.public_ip,
  });
};
