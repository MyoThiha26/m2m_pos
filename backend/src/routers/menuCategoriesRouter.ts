import express, { Request, Response } from "express";
import { checkAuth } from "../auth/auth";
import { db } from "../../db/db";
export const menuCategoriesRouter = express.Router();

menuCategoriesRouter.post(
  "/",
  checkAuth,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .send({ error: "Bad request. Please provide menu category name." });
    const text = "INSERT INTO menu_categories(name) VALUES($1) RETURNING *";
    const values = [name];
    const result = await db.query(text, values);
    res.send({ menu_categories: result.rows });
  }
);

menuCategoriesRouter.delete(
  "/:menuCategoryId",
  checkAuth,
  async (req: Request, res: Response) => {
    const menuCategoryId = req.params.menuCategoryId;
    if (!menuCategoryId) return res.send("Menu category id is required.");
    const text = "DELETE FROM menu_categories WHERE id =($1) RETURNING *";
    const values = [menuCategoryId];
    const result = await db.query(text, values);
    res.send({ menuCategory: result.rows });
  }
);
