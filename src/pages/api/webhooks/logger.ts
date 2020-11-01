export default (req, res) => {
  console.info('webhook received', new Date())
  console.info(JSON.stringify(req.body, null, 3))

  res.send('received')
}
