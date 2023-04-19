import { Box, Button, TextField } from "@mui/material";

const Menus = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 300,
        m: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Create a new menu</h1>
      <TextField label="Name" variant="outlined" sx={{ mb: 2 }} />
      <TextField
        label="Price"
        variant="outlined"
        type="number"
        sx={{ mb: 2 }}
      />
      <Button variant="contained">Create</Button>
    </Box>
  );
};

export default Menus;
