export default (commentDB) => async (query) => {
  const result = await commentDB.getAllComments(query);

  return {
    status: 'success',
    message: 'All comments retrieved',
    ...result,
  };
};
