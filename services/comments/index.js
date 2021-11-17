import commentDB from '../../db/comment.js';
import addComment from './add-comment.js';
import deleteComment from './delete-comment.js';
import getAllComments from './get-all-comments.js';
import getComment from './get-comment.js';
import getComments from './get-comments.js';

export default Object.freeze({
  addComment: addComment(commentDB),
  deleteComment: deleteComment(commentDB),
  getComment: getComment(commentDB),
  getComments: getComments(commentDB),
  getAllComments: getAllComments(commentDB),
});
