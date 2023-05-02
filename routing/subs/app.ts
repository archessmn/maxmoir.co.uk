import Express from "express"

function router(req: Express.Request, res: Express.Response) {

  res.setHeader("Service-Worker-Allowed", "/fcdn/")

  res.render("app.ejs")



}

export default router
module.exports = router