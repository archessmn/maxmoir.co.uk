import Express from "express"

function router(req: Express.Request, res: Express.Response) {
  

  var subs : string[] = req.headers.host?.split(".") || []

  var subRouterPath : string = ""

  if (subs.length > 3) {
    res.redirect(`https://maxmoir.co.uk${req.url}`)
  }

  res.render("index.ejs")

}

export default router
module.exports = router
