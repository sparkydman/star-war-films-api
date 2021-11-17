export default ({ deleteComment }) =>
  async ({ params }) => {
    try {
      // delete a comment by id
      const result = await deleteComment(params.id);
      return {
        body: result,
        statusCode: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        body: { error: err.message },
        statusCode: 400,
      };
    }
  };
