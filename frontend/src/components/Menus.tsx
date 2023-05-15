import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Layout from "./Layout";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { Menu } from "../typings/types";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Menus = () => {
  const { menuLocations } = useContext(AppContext);
  const selectedLocationId = localStorage.getItem("selectedLocation");
  const { fetchData, menus } = useContext(AppContext);
  console.log(menus);

  const validMenuLocations = menuLocations
    .filter(
      (menuLocation) => String(menuLocation.locations_id) === selectedLocationId
    )
    .map((menuLocation) => menuLocation.menus_id);
  const filteredMenus = menus.filter((menu) =>
    validMenuLocations.includes(menu.id as number)
  );

  return (
    <Layout title="Menus">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "0 auto",
          px: 4,
        }}
      >
        <Box sx={{ display: "flex", mt: 5 }}>
          <Link
            to={"/menus/create"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Box
              sx={{
                width: "300px",
                height: "300px",
                border: "2px dotted lightgray",
                borderRadius: 2,
                mr: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <AddIcon fontSize="large" />
              <Typography>Add new menu</Typography>
            </Box>
          </Link>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {filteredMenus.map((menu) => (
              <Link
                key={menu.id}
                to={`/menus/${menu.id}`}
                style={{
                  textDecoration: "none",
                  marginRight: "15px",
                  marginBottom: "20px",
                }}
              >
                <Card sx={{ width: 300, height: 300 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {menu.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {menu.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Menus;
