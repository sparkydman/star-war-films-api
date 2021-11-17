export default (commentDB) => async (id) => {
  await commentDB.deleteComment(id);
  return {
    status: 'success',
    message: 'Comment deleted',
  };
};
