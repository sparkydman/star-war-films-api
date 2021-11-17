export default ({ getComments }) =>
  async ({ params, query, url }) => {
    try {
      // get all comments in a film
      const result = await getComments(params.film_id, query, url);
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
