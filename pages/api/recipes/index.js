export default (req, res) => {
  if (req.method === 'GET') {
    res.status(200)
    res.json(
      {
        data: "data"
      }
    )
  }
  else {
    res.status(400)
  }
}

