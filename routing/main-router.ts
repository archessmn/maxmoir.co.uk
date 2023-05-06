import Express, { Router } from "express";
import rootRouter from "./routers/rootRouter";
import apiRouter from "./routers/apiRouter";
import authRouter from "./routers/authRouter";

const subdomain_control = require("express-subdomain");

const router = Router();

router.use(subdomain_control("maxmoir", rootRouter));
router.use(subdomain_control("api.maxmoir", apiRouter));
router.use(subdomain_control("auth.maxmoir", authRouter));

export default router;
// module.exports = router
