var fs = require("fs"),
  https = require("https")


var express = require("express"),
  app=express()



app.route("/*").get((req, res) => {
  res.send("HELLO")
})


var privateKey = fs.readFileSync( '/etc/nginx/ssl/cert.key' );
var certificate = fs.readFileSync( '/etc/nginx/ssl/cert.pem' );

console.log("Server Started")

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(8080, "0.0.0.0");