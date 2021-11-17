import ip from 'ip';
export default (controller) => (req, res) => {
  // get the request details from express
  const reqBody = {
    body: req.body,
    path: req.path,
    url: req.url,
    params: req.params,
    method: req.method,
    query: req.query,
    ip: ip.address(),
    headers: {
      'Content-Type': req.get('Content-Type'),
      Referer: req.get('referer'),
      'User-Agent': req.get('User-Agent'),
    },
  };
  controller(reqBody)
    .then((httpRes) => {
      if (httpRes?.headers) {
        res.set(httpRes.headers);
      }
      res.type('json');
      res.status(httpRes.statusCode || 400).send(httpRes.body);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: 'network error' });
    });
};
