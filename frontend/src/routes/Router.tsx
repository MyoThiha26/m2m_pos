import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Menus from "../components/Menus";
import MenuCategories from "../components/MenuCategories";
import Addons from "../components/Addons";
import AddonCategories from "../components/AddonCategories";
import Settings from "../components/Settings";
import MenuDetail from "../components/MenuDetail";
import Locations from "../components/Locations";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/locations",
    element: <Locations />,
  },
  {
    path: "/menus",
    element: <Menus />,
  },
  {
    path: "/menus/:menuId", // Dynamic Route
    element: <MenuDetail />,
  },
  {
    path: "/menu-categories",
    element: <MenuCategories />,
  },
  {
    path: "/addons",
    element: <Addons />,
  },
  {
    path: "/addons-categories",
    element: <AddonCategories />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);
