import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./db/db";
const app = express();
const port = 5000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/data", async (req: Request, res: Response) => {
  const menus = await db.query("select * from menus");
  const menuCategories = await db.query("select * from menu_categories");
  const addons = await db.query("select * from addons");
  const addonCategories = await db.query("select * from addon_categories");
  res.send({
    menus: menus.rows,
    menuCategories: menuCategories.rows,
    addons: addons.rows,
    addonCategories: addonCategories.rows,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
