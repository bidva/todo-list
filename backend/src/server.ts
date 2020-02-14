require("dotenv").config();
import cors from "cors";
import express from "express";
import middleware from "./middleware";
import { getRoutes } from "./services";
import { applyMiddleware, applyRoutes } from "./utils";
import morgan from "morgan";

import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

// 2 seconds waiting added to show async operations
app.use((req, res, next) => {setTimeout(next, 2000); });

applyMiddleware(middleware, app);
applyRoutes(getRoutes(), app);

app.options("/*", (req, res, next) => {
  res.sendStatus(200);
});

const port = 3001;
app.listen(port, () => console.log(`app listening on port ${port}!`));

export default app;
