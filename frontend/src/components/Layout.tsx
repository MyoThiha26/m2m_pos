import NavBar from "./NavBar";
import { BrowserRouter, Link } from "react-router-dom";
import Routes from "./Routes";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = (props: Props) => {
  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  );
};

export default Layout;
