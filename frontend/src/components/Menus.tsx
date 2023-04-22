import { Box, Button, TextField } from "@mui/material";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { config } from "../config/config";
import { Menu } from "../typings/types";

const Menus = () => {
  const [menu, setMenu] = useState<Menu>({ name: "", price: 0 });
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

  return (
    <Layout>
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
      </Box>
      {/* menus */}
    </Layout>
  );
};

export default Menus;
