export default ({ getAllComments }) =>
  async ({ query, url }) => {
    try {
      // get all comments
      const result = await getAllComments(query, url);
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
