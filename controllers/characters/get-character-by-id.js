export default ({ getCharacterById }) =>
  async ({ params }) => {
    try {
      // get all the star wars films
      const result = await getCharacterById(params.id);
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
