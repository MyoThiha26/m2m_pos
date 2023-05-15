import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Menus from "../components/Menus";
import MenuCategories from "../components/MenuCategories";
import Addons from "../components/Addons";
import AddonCategories from "../components/AddonCategories";
import Settings from "../components/Settings";
import MenuDetail from "../components/MenuDetail";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "./PrivateRoute";
import Logout from "../components/Logout";
import CreateMenu from "../components/CreateMenu";
import Locations from "../components/Locations";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/menus",
    element: <Menus />,
  },
  {
    path: "/menus/:menuId",
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
    path: "/addon-categories",
    element: <AddonCategories />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App} />
          <Route path="/orders" Component={App} />
          <Route path="/menus" Component={Menus} />
          <Route path="/menus/create" Component={CreateMenu} />
          <Route path="/menus/:menuId" Component={MenuDetail} />
          <Route path="/menu-categories" Component={MenuCategories} />
          <Route path="/addons" Component={Addons} />
          <Route path="/addon-categories" Component={AddonCategories} />
          <Route path="/locations" Component={Locations} />
          <Route path="/settings" Component={Settings} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="/register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
