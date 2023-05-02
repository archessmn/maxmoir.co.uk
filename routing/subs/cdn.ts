import Express from "express"
import fs from "fs"
import path from "path"

function router(req: Express.Request, res: Express.Response) {

  var resourceURL : string = req.url

  if (resourceURL == "/") {
    res.render("app.ejs")
    return
  }

  try {
    if (fs.existsSync(`${process.cwd()}/routing/routes/src${resourceURL}`)) {

      var fileType : string = resourceURL.split(".")[-1] || "null"

      // if (fileType === "css") {
      //   res.setHeader("Cache-Control", "")
      // }

      // console.log(fileType)

      res.sendFile(path.join(process.cwd(), "/routing/routes/src", resourceURL))
    } else {
      res.destroy()
    }
  } catch(err) {
    console.error(err)
    res.destroy()
  }

}

export default router
module.exports = router