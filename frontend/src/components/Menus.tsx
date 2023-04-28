import { Box, Button, Chip, TextField } from "@mui/material";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { config } from "../config/config";
import { Menu } from "../typings/types";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Menus = () => {
  const { menuLocations } = useContext(AppContext);
  const query = new URLSearchParams(window.location.search);
  const locationId = query.get("locationId") as unknown as string;
  const [menu, setMenu] = useState<Menu>({
    name: "",
    price: 0,
    isAvailable: true,
  });
  const { fetchData, menus } = useContext(AppContext);

  const createMenu = async () => {
    if (!menu.name) return console.log("Please enter menu name");
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    });
    fetchData();
  };

  const deleteMenu = async (menuId?: number) => {
    if (!menuId) return;
    const response = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const validMenuLocations = menuLocations
    .filter((menuLocation) => String(menuLocation.locations_id) === locationId)
    .map((menuLocation) => menuLocation.menus_id);
  const filteredMenus = menus.filter((menu) =>
    validMenuLocations.includes(menu.id as number)
  );
  console.log("filtered menus: ", filteredMenus);
  return (
    <Layout>
      {locationId ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 300,
            m: "0 auto",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Create a new menu</h1>
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setMenu({ ...menu, price: parseInt(evt.target.value, 10) })
            }
          />
          <Button variant="contained" onClick={createMenu}>
            Create
          </Button>
          <Box sx={{ mt: 5 }}>
            {filteredMenus.map((menu) => (
              <Link key={menu.id} to={`/menus/${menu.id}`}>
                <Chip
                  label={menu.name}
                  sx={{ mr: 1, mb: 2, cursor: "pointer" }}
                  onDelete={() => deleteMenu(menu.id)}
                />
              </Link>
            ))}
          </Box>
        </Box>
      ) : (
        <Box>
          <h1>Missing location id</h1>
        </Box>
      )}
    </Layout>
  );
};

export default Menus;
