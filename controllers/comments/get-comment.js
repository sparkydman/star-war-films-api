export default ({ getComment }) =>
  async ({ params }) => {
    try {
      // get a comment by id
      const result = await getComment(params.id);
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
