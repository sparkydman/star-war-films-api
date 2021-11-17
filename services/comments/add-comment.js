import comment from '../../entity/comment.js';

export default (commentDB) => async (body) => {
  const makeComment = comment(body);
  const result = await commentDB.addComment(makeComment);

  return {
    status: 'success',
    message: 'Comment added',
    data: result,
  };
};
