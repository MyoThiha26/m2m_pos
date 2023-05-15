import express, { Request, Response } from "express";
import { db } from "../../db/db";
import { checkAuth } from "../auth/auth";
export const locationsRouter = express.Router();

locationsRouter.put(
  "/:locationId",
  checkAuth,
  async (req: Request, res: Response) => {
    const locationId = req.params.locationId;
    const { name, address } = req.body;
    if (!locationId || !name || !address) return res.sendStatus(400);
    const locationResult = await db.query(
      "update locations set name = $1, address = $2 where id = $3",
      [name, address, locationId]
    );
    res.send(locationResult.rows[0]);
  }
);

locationsRouter.delete(
  "/:locationId",
  checkAuth,
  async (req: Request, res: Response) => {
    const locationId = req.params.locationId;
    if (!locationId) return res.sendStatus(400);
    try {
      await db.query("delete from locations where id = $1", [locationId]);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

locationsRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, address, companyId } = req.body;
  const isValid = name && address && companyId;
  if (!isValid) return res.sendStatus(400);
  const locationResult = await db.query(
    "insert into locations (name,address,companies_id) values ($1, $2, $3)",
    [name, address, companyId]
  );
  res.send(locationResult.rows[0]);
});
