import Express from "express"

function router(req: Express.Request, res: Express.Response) {
  // res.send(`${req.headers.host}${req.url}`)
  res.send("root router reached")

}

export default router
module.exports = router
