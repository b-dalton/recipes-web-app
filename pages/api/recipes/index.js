export default (req, res) => {
  if (req.method === 'GET') {
    res.status(200);
    res.json({
      data: { recipes: {} },
    });
  } else {
    res.status(400);
  }
};
