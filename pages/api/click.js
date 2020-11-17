module.exports = (req, res) => {
  const { input } = req.query
  res.status(200).send({ value: input })
}