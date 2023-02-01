import Express from "express"
import fs from "fs"
import path from "path"

function router(req: Express.Request, res: Express.Response) {

  // console.log("CDN Request")

  var resourceURL : string = req.url

  // console.log(fs.readdirSync('./routing/routes/src/'))

  // console.log(path.join(process.cwd(), "/routing/routes/src", resourceURL))

  try {
    if (fs.existsSync(`${process.cwd()}/routing/routes/src${resourceURL}`)) {
      // console.log("Hello")
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