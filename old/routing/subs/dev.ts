import Express from "express"

function router(req: Express.Request, res: Express.Response) {
  res.send("dev router reached")

}

export default router
module.exports = router