import fs from "fs"
import https from "https"

import Express from "express"

import { router } from "./routing/sub-router"

var app = Express()

app.all("/*", (req, res) => router(req, res))


var privateKey = fs.readFileSync( '/etc/nginx/ssl/maxmoir.co.uk.key' );
var certificate = fs.readFileSync( '/etc/nginx/ssl/maxmoir.co.uk.pem' );

console.log("Server Started")

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(8080, "0.0.0.0");