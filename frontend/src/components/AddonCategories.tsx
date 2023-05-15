import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";
import Layout from "./Layout";

const AddonCategories = () => {
  const [isRequired, setIsRequired] = useState("");

  const handleChange = (event: any) => {
    setIsRequired(event.target.value);
  };
  return (
    <Layout title="Addon Categories">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          m: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Create a new addon category</h1>
        <TextField label="Name" variant="outlined" sx={{ mb: 2 }} />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          sx={{ mb: 2 }}
        />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Is required
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={isRequired}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Required"}>Required</MenuItem>
            <MenuItem value={"Optional"}>Optional</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained">Create</Button>
      </Box>
    </Layout>
  );
};

export default AddonCategories;
