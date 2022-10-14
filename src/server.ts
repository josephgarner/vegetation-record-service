import Koa from "koa";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import { createServer } from "http";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { AppRoutes } from "./routes";
// import { connectToDatabase } from "./db";

const app = new Koa();
const router = new Router();

console.log("ENV:", process.env.NODE_ENV);
// connectToDatabase();

AppRoutes.forEach((route) => router[route.method](route.path, route.action));

// run app
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
