import { db } from "../../db/db";
import { CreateMenuParams, Menu } from "../types/menu";

interface MenuQueries {
  createMenu: (createMenuParams: CreateMenuParams) => Promise<Menu>;
  getMenu: (menuId: string) => Promise<Menu | undefined>;
  // getMenuByLocationId:
}

export const menuQueries: MenuQueries = {
  createMenu: async (createMenuParams: CreateMenuParams) => {
    const { name, price, locationIds, imageUrl } = createMenuParams;
    const text =
      "INSERT INTO menus(name, price, image_url) VALUES($1, $2, $3) RETURNING *";
    const values = [name, price, imageUrl];
    const result = await db.query(text, values);
    const menu = result.rows[0] as Menu;
    const menuId = menu.id as string;
    await db.query(
      `insert into menus_locations (menus_id, locations_id) select * from unnest ($1::int[], $2::int[], $3::boolean[])`,
      [Array(locationIds.length).fill(menuId), locationIds]
    );
    return { id: menuId, name, price, locationIds };
  },
  getMenu: async (menuId: string) => {
    const menuResult = await db.query(
      `select * from menus where menu_id = $1`,
      [menuId]
    );
    const hasMenu = menuResult.rows.length > 0;
    if (hasMenu) {
      const menu = menuResult.rows[0] as Menu;
      const menuLocationsResult = await db.query(
        `select locations_id from menus_locations where menus_id = $1`,
        [menuId]
      );
      const locationIds = menuLocationsResult.rows[0];
      const menuMenuCategoryResult = await db.query(
        `select menu_categories_id from menus_menu_categories where menus_id = $1`,
        [menuId]
      );
      const menuCategoryIds = menuMenuCategoryResult.rows[0];
      const menuAddonCategoryResult = await db.query(
        `select addon_categories_id from menus_addon_categories where menus_id = $1`,
        [menuId]
      );
      const addonCategoryIds = menuAddonCategoryResult.rows[0];
      return {
        id: menuId,
        name: menu.name,
        price: menu.price,
        locationIds,
        menuCategoryIds,
        addonCategoryIds,
      };
    }
  },
};
