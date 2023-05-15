import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "./Layout";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import { config } from "../config/config";
import { Menu } from "../typings/types";
import { Link, useNavigate } from "react-router-dom";
import { AppContext, defaultContext } from "../contexts/AppContext";

const Logout = () => {
  const { updateData } = useContext(AppContext);
  useEffect(() => {
    updateData(defaultContext);
    localStorage.removeItem("accessToken");
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Typography variant="h3">You are logged out.</Typography>
      </Box>
    </Layout>
  );
};

export default Logout;
