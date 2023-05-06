import Express, { Router } from "express";
import webpush from "web-push";
import path from "path";

const router = Router();

var subscriptionData = {};

router.post("/send-notification", (req, res) => {
  var title = req.body.title;
  var body = req.body.body;

  // webpush.sendNotification(
  //   subscriptionData,
  //   JSON.stringify({
  //     title,
  //     body,
  //   })
  // );
  res.sendStatus(200);
});

router.post("/save-subscription", async (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

router.use(Express.static("public/root"));

router.get("/", (req, res) => {
  res.render("root/index.ejs");
});

// router.get("/save-subscription", async (req, res) => {
//   console.log(req.body);
//   res.sendStatus(200);
// });

export default router;
