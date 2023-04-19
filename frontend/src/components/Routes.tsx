import { Link } from "react-router-dom";
import Layout from "./Layout";
import NavBar from "./NavBar";

const Routes = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/menus">Menus</Link>
      <Link to="/menu-categories">Menus Categories</Link>
      <Link to="/addons">Addons</Link>
      <Link to="/addons-categories">Addon Categories</Link>
    </>
  );
};

export default Routes;
