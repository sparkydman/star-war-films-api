export default (commentDB) => async (film_id, query) => {
  const result = await commentDB.getComments(film_id, query);
  return {
    status: 'success',
    message: 'Comments retrieved',
    data: result,
  };
};
