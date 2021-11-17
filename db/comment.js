import db from './index.js';

const addComment = async ({
  text,
  commented_by,
  commented_at,
  film_id,
  public_ip,
}) => {
  try {
    const res = await db.query(
      `
     INSERT INTO comments (text, commented_by, commented_at, film_id,public_ip) VALUES ($1,$2,$3,$4,$5) RETURNING *;
     `,
      [text, commented_by, commented_at, film_id, public_ip]
    );
    return res.rows[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

const getComments = async (film_id, query) => {
  const commentFields = [
    'text',
    'commented_by',
    'commented_at',
    'film_id',
    'id',
  ];

  const fields = query?.select ? query.select : '*';

  if (query?.sort && !commentFields.includes(query.sort))
    throw new Error(`Sorting with ${query.sort} is not supported`);

  if (query?.select && query?.sort && !fields.split(',').includes(query.sort))
    throw new Error(`column ${query.sort} most be included in the selection`);

  const sort = query?.sort ? query.sort : 'commented_at';

  const limit = query?.limit ? query.limit : 3;
  const page = query?.page ? query.page : 1;

  try {
    const res = await db.query(
      `
    SELECT * FROM comments WHERE film_id = $1 ORDER BY $2 DESC LIMIT $3 OFFSET $4;
    `,
      [film_id, sort, limit, getOffset(limit, page)]
    );

    const count = +(await getCommentsCount());
    const next = count > getOffset(limit, page) ? +page + 1 : null;
    const prev = next - 1 !== 0 ? next - 2 : null;

    return {
      next,
      previous: prev,
      count,
      results: res.rows,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getCommentsCount = async (film_id) => {
  let option = film_id ? `WHERE film_id = ${film_id}` : '';

  try {
    const res = await db.query(
      `
    SELECT COUNT(*) AS comment_count FROM comments ${option};
    `
    );
    return res.rows[0].comment_count;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getOffset = (limit, page) => {
  return +limit * (+page - 1);
};

const getAllComments = async (query) => {
  const commentFields = [
    'text',
    'commented_by',
    'commented_at',
    'film_id',
    'id',
  ];

  const fields = query?.select ? query.select : '*';

  if (query?.sort && !commentFields.includes(query.sort))
    throw new Error(`Sorting with ${query.sort} is not supported`);

  if (query?.select && query?.sort && !fields.split(',').includes(query.sort))
    throw new Error(`column ${query.sort} most be included in the selection`);

  const sort = query?.sort ? query.sort : 'commented_at';

  const limit = query?.limit ? query.limit : 3;
  const page = query?.page ? query.page : 1;

  try {
    const res = await db.query(
      `
    SELECT ${fields} FROM comments ORDER BY $2 DESC LIMIT $1 OFFSET $3;
    `,
      [limit, sort, getOffset(limit, page)]
    );
    const count = +(await getCommentsCount());
    const next = count > getOffset(limit, page) ? +page + 1 : null;
    const prev = next - 1 !== 0 ? next - 2 : null;

    return {
      next,
      previous: prev,
      count,
      results: res.rows,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const getComment = async (id) => {
  try {
    const res = await db.query(
      `
    SELECT * FROM comments WHERE id = $1;
    `,
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteComment = async (id) => {
  try {
    return await db.query(
      `
    DELETE from comments WHERE id = $1
    `,
      [id]
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

export default Object.freeze({
  addComment,
  getComments,
  getComment,
  deleteComment,
  getAllComments,
  getCommentsCount,
});
