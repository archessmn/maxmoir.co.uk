import Express, { Router } from "express";
import apiRouter from "./routers/apiRouter";

const subdomain_control = require("express-subdomain");

const router = Router();

router.use(subdomain_control("api.maxmoir", apiRouter));

export default router;
// module.exports = router
