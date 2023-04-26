import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./db/db";
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/menus", async (req: Request, res: Response) => {
  const { name, price } = req.body;
  const text = "INSERT INTO menus(name, price) VALUES($1, $2) RETURNING *";
  const values = [name, price];
  const result = await db.query(text, values);
  res.send({ menu: result.rows });
});

app.delete("/menus/:menuId", async (req: Request, res: Response) => {
  const menuId = req.params.menuId;
  if (!menuId) return res.send("Menu id is required.");
  const text = "DELETE FROM menus WHERE id =($1) RETURNING *";
  const values = [menuId];
  const result = await db.query(text, values);
  res.send({ menu: result.rows });
});

app.put("/menus/:menuId", async (req: Request, res: Response) => {
  const menuId = req.params.menuId;
  if (!menuId) return res.send("Menu id is required.");
  const payload = req.body;
  const { name, price } = payload;
  if (!name || !price)
    return res.send("Please provide at least name or price.");
  const text = "UPDATE menus SET name=$1, price=$2  WHERE id =($3) RETURNING *";
  const values = [name, price, menuId];
  const result = await db.query(text, values);
  res.send({ menu: result.rows });
});

app.get("/data", async (req: Request, res: Response) => {
  const menus = await db.query(`select * from menus`);
  const menuCategories = await db.query("select * from menu_categories");
  const addons = await db.query("select * from addons");
  const addonCategories = await db.query("select * from addon_categories");
  const locations = await db.query("select * from locations");
  const menuLocations = await db.query("select * from menus_locations");
  res.send({
    menus: menus.rows,
    menuCategories: menuCategories.rows,
    addons: addons.rows,
    addonCategories: addonCategories.rows,
    locations: locations.rows,
    menuLocations: menuLocations.rows,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
