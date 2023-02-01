import fs from "fs"
import https from "https"

import Express from "express"
import bodyParser from "body-parser"
import dotENV from "dotenv"

dotENV.config()

import { router } from "./routing/sub-router"

var app = Express()

app.all("/*", (req, res) => router(req, res))


var privateKey = fs.readFileSync( '/etc/nginx/ssl/maxmoir.co.uk.key' );
var certificate = fs.readFileSync( '/etc/nginx/ssl/maxmoir.co.uk.pem' );


import flash from "express-flash"
import session from "express-session"
import methodOverride from "method-override"

app.set("etag", false)

app.set("view engine", "ejs")
app.use(bodyParser.json());
// app.use(Express.static(`${__dirname}/views/src`))
app.use(Express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET || "",
  resave: false,
  saveUninitialized: false
}))
app.use(methodOverride("_method"))
app.use((req, res, next) => {

  console.log("Shouldnt be caching")

  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
  next()
})

// console.log(__dirname)

console.log("Server Started")

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(8080, "0.0.0.0");