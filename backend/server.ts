import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { menusRouter } from "./src/routers/menuRouter";
import { menuCategoriesRouter } from "./src/routers/menuCategoriesRouter";
import { appRouter } from "./src/routers/appRouter";
import { authRouter } from "./src/routers/authRouter";
import { locationsRouter } from "./src/routers/locationsRouter";
import { settingsRouter } from "./src/routers/settingsRouter";
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/", appRouter);
app.use("/auth", authRouter);
app.use("/menus", menusRouter);
app.use("/menu-categories", menuCategoriesRouter);
app.use("/locations", locationsRouter);
app.use("/settings", settingsRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
