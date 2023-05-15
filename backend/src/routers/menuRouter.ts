import express, { Request, Response } from "express";
import { checkAuth } from "../auth/auth";
import { db } from "../../db/db";
import { menuQueries } from "../queries/menuQueries";
import { config } from "../config/config";
import { fileUpload } from "../utils/fileUpload";
export const menusRouter = express.Router();

menusRouter.get("/:menuId", async (req: Request, res: Response) => {
  const menuId = req.params.menuId;
  const menu = await menuQueries.getMenu(menuId);
  res.send(menu);
});

menusRouter.post("/", async (req: Request, res: Response) => {
  const { name, price, locationIds } = req.body;
  try {
    fileUpload(req, res, async (error) => {
      const fileName = req.files;
      if (error) {
        return res.sendStatus(500);
      }
      console.log(fileName);
      const imageUrl = `${config.spaceEndpoint}/happy-pos/myo-thiha/${fileName}`;
      const menu = await menuQueries.createMenu({
        name,
        price,
        locationIds,
        imageUrl,
      });
      res.send(menu);
      res.sendStatus(200);
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

menusRouter.delete(
  "/:menuId",
  checkAuth,
  async (req: Request, res: Response) => {
    const menuId = req.params.menuId;
    if (!menuId) return res.send("Menu id is required.");
    const text = "DELETE FROM menus WHERE id =($1) RETURNING *";
    const values = [menuId];
    const result = await db.query(text, values);
    res.send({ menu: result.rows });
  }
);

menusRouter.put("/:menuId", checkAuth, async (req: Request, res: Response) => {
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
