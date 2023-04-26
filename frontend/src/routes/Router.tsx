import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Menus from "../components/Menus";
import MenuCategories from "../components/MenuCategories";
import Addons from "../components/Addons";
import AddonCategories from "../components/AddonCategories";
import Settings from "../components/Settings";
import MenuDetail from "../components/MenuDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/locations/:locationId/menus",
    element: <Menus />,
  },
  {
    path: "/locations/:locatioId/menus/:menuId",
    element: <MenuDetail />,
  },
  {
    path: "/locations/:locatioId//menu-categories",
    element: <MenuCategories />,
  },
  {
    path: "/addons",
    element: <Addons />,
  },
  {
    path: "/addon-categories",
    element: <AddonCategories />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);
