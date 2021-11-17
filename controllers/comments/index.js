import commentService from '../../services/comments/index.js';
import addComment from './add-comment.js';
import deleteComment from './delete-comment.js';
import getAllComments from './get-all-comments.js';
import getComment from './get-comment.js';
import getComments from './get-comments.js';

export default Object.freeze({
  addComment: addComment({ addComment: commentService.addComment }),
  deleteComment: deleteComment({
    deleteComment: commentService.deleteComment,
  }),
  getComment: getComment({ getComment: commentService.getComment }),
  getComments: getComments({ getComments: commentService.getComments }),
  getAllComments: getAllComments({
    getAllComments: commentService.getAllComments,
  }),
});
