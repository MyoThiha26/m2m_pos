import {
  Box,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import Layout from "./Layout";

const Addons = () => {
  const [addonCategory, setAddonCategory] = useState("");

  const handleChange = (event: any) => {
    setAddonCategory(event.target.value);
  };
  return (
    <Layout title="Addon">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          m: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Create a new addon</h1>
        <TextField label="Name" variant="outlined" sx={{ mb: 2 }} />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          sx={{ mb: 2 }}
        />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Addon Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={addonCategory}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Toppings"}>Toppings</MenuItem>
            <MenuItem value={"Spicy Level"}>Spicy Level</MenuItem>
            <MenuItem value={"Size"}>Size</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained">Create</Button>
      </Box>
    </Layout>
  );
};

export default Addons;
