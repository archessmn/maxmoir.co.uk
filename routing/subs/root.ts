import Express from "express"

function router(req: Express.Request, res: Express.Response) {

  /* Redirect if host isn't root */
  var subs : string[] = req.headers.host?.split(".") || []
  if (subs.length > 3) {
    res.redirect(`https://maxmoir.co.uk${req.url}`)
    return
  }

  
  res.render("index.ejs")

  

}

export default router
module.exports = router
