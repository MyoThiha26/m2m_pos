import { Box, BoxProps } from "@mui/material";
import Layout from "./Layout";
import { Link } from "react-router-dom";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        cursor: "pointer",
        ...sx,
      }}
      {...other}
    />
  );
}

const Locations = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Link to="/menus/" style={{ textDecoration: "none" }}>
          <Item>Insein KFC</Item>
        </Link>
        <Link to="/menus/" style={{ textDecoration: "none" }}>
          <Item>Heledan KFC</Item>
        </Link>
        <Link to="/menus/" style={{ textDecoration: "none" }}>
          <Item>Lan Ma Taw KFC</Item>
        </Link>
      </Box>
    </Layout>
  );
};

export default Locations;
