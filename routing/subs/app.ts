import Express from "express"

function router(req: Express.Request, res: Express.Response) {
  res.render("app.ejs")



}

export default router
module.exports = router