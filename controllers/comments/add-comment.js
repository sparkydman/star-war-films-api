export default ({ addComment }) =>
  async ({ body, ip }) => {
    try {
      // add a comment
      const result = await addComment({ ...body, public_ip: ip });
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
