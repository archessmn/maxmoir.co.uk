/* Package imports */
import fs from "fs"
import https from "https"
import Express from "express"
import bodyParser from "body-parser"
import dotENV from "dotenv"
import flash from "express-flash"
import session from "express-session"
import methodOverride from "method-override"

/* Set up .env */
dotENV.config()

var app = Express()


/* SSL Key locations on server */
var privateKey = fs.readFileSync( '/etc/nginx/ssl/maxmoir.co.uk.key' );
var certificate = fs.readFileSync( '/etc/nginx/ssl/maxmoir.co.uk.pem' );


/* Set up settings and middleware */
app.set("etag", false)
app.set("view engine", "ejs")

app.use(bodyParser.json());
app.use(Express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET || "",
  resave: false,
  saveUninitialized: false
}))
app.use(methodOverride("_method"))
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
  res.setHeader("x-powered-by", "Pure Skill")
  next()
})

/* Forward CDN requests to CDN sub */
app.use((req, res, next) => {
  var forwardURL : string = req.url

  if (forwardURL.substring(0, 5) == "/cdn/") {
    res.redirect(`https://cdn.maxmoir.co.uk${forwardURL.substring(4, forwardURL.length)}`)
  } else {
    next()
  }

})


/* Forward all traffic to the router */
import { router } from "./routing/sub-router"

app.all("/*", (req, res) => router(req, res))


/* Start server */
console.log("Server Started")

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(8080, "0.0.0.0");