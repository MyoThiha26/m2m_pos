import { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Menu } from "../typings/types";
import { config } from "../config/config";

const MenuDetail = () => {
  const { menus, menuLocations, menuCategories, ...data } =
    useContext(AppContext);
  const mappedMenuCategories = menuCategories.map((menuCategory) => ({
    id: menuCategory.id,
    label: menuCategory.name,
  }));
  const { menuId } = useParams();
  let menu: Menu | undefined;
  if (menuId) {
    menu = menus.find((menu) => menu.id === parseInt(menuId, 10));
    if (menu) {
      const menuLocation = menuLocations.find(
        (item) => item.menus_id === menu?.id
      );
      if (menuLocation) {
        menu.isAvailable = menuLocation.is_available;
      }
    }
  }
  const [newMenu, setMenu] = useState({ name: "", price: 0 });

  useEffect(() => {
    if (menu) {
      console.log("menu", menu);
      setMenu({ name: menu.name, price: menu.price });
    }
  }, [menu]);

  const updateMenu = async () => {
    const response = await fetch(`${config.apiBaseUrl}/menus/${menu?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    console.log(await response.json());
  };

  if (!menu) return null;

  return (
    <Layout title="Menu Detail">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 200,
          margin: "0 auto",
          mt: 5,
        }}
      >
        <Box>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            defaultValue={menu.name}
            sx={{ mb: 2 }}
            onChange={(evt) => setMenu({ ...newMenu, name: evt.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            type="number"
            defaultValue={menu.price}
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setMenu({ ...newMenu, price: parseInt(evt.target.value, 10) })
            }
          />
          <Autocomplete
            multiple
            disablePortal
            options={mappedMenuCategories}
            sx={{ width: 300, mb: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Menu Categories" />
            )}
          />
          <Button variant="contained" onClick={updateMenu}>
            Update
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default MenuDetail;
