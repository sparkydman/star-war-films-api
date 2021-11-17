export default ({ getCharacters }) =>
  async ({ query }) => {
    try {
      // get all the star wars films
      const result = await getCharacters(query);
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
