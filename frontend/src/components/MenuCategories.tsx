import { Box, TextField, Button } from "@mui/material";
import Layout from "./Layout";

const MenuCategories = () => {
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
        <h1 style={{ textAlign: "center" }}>Create a new menu category</h1>
        <TextField label="Name" variant="outlined" sx={{ mb: 2 }} />
        <Button variant="contained">Create</Button>
      </Box>
    </Layout>
  );
};

export default MenuCategories;
