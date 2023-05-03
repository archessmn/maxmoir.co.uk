import Express from "express"
import { ModuleBlock } from "typescript"

export function router(req: Express.Request, res: Express.Response) {
  // res.send(`${req.headers.host}${req.url}`)
  var subs : string[] = req.headers.host?.split(".") || []

  var subRouterPath : string = ""

  if (subs.length > 3) {
    for (let i = subs.length - 4; i >= 0; i--) {
      subRouterPath = `${subRouterPath}/${subs[i]}`
    }

    // res.send(subRouterPath)
  } else {
    subRouterPath = "/root"
  }

  try {
    var subRouter = require(`./subs${subRouterPath}`)
  } catch (e) {
    var subRouter = require("./subs/root")
  }

  try {
    subRouter(req, res)
  } catch (e) {
    res.send("An error occurred, please return to https://maxmoir.co.uk if this issue persists.")
  }
  

}