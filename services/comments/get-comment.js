export default (commentDB) => async (id) => {
  const result = await commentDB.getComment(id);

  return {
    status: 'success',
    message: 'Comment retrieved',
    data: result,
  };
};
