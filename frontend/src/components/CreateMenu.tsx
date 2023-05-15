import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { Location } from "../typings/types";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../typings/types";
import { config } from "../config/config";
import FileDropZone from "./FileDropZone";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { AppContext } from "../contexts/AppContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateMenu = () => {
  const { locations } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const [menuImage, setMenuImage] = useState<File>();
  const [menu, setMenu] = useState<Menu>({
    name: "",
    price: 0,
    description: "",
    locationIds: [],
    isAvailable: true,
  });
  const isDisabled =
    !menu.name || !menu.description || !menu.locationIds.length;

  useEffect(() => {
    console.log("menu: ", menu);
  }, [menu]);

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const createMenu = async () => {
    if (!menu.name) return console.log("Please enter menu name");
    setIsLoading(true);
    try {
      if (menuImage) {
        const formData = new FormData();
        formData.append("files", menuImage as Blob);
        const response = await fetch(`${config.apiBaseUrl}/assets`, {
          method: "POST",
          body: formData,
        });
        const responseJSON = await response.json();
        const assetUrl = responseJSON.assetUrl;
        menu.assetUrl = assetUrl;
      }
      const response = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menu),
      });
      setIsLoading(false);
      if (response.ok) {
        navigate("/menus");
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const deleteMenu = async (menuId?: number) => {
    if (!menuId) return;
    const response = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
      method: "DELETE",
    });
  };

  const getValues = () => {
    return locations
      .filter((location) => {
        return location.id && selectedLocationIds.includes(location.id);
      })
      .map((location) => location.name);
  };

  return (
    <Layout>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 350,
            margin: "0 auto",
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
          <TextField
            label="Description"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setMenu({ ...menu, description: evt.target.value })
            }
          />
          <FormControl>
            <InputLabel id="select-location">Location</InputLabel>
            <Select
              label="Location"
              labelId="select-location"
              multiple
              value={selectedLocationIds}
              onChange={(evt) => {
                const values = evt.target.value as number[];
                setSelectedLocationIds(values);
                console.log(values);
                setMenu({ ...menu, locationIds: values });
              }}
              input={<OutlinedInput label="Location" />}
              renderValue={(values) => {
                const selectedLocations = selectedLocationIds.map(
                  (selectedLocationId) => {
                    return locations.find(
                      (location) => location.id === selectedLocationId
                    ) as Location;
                  }
                );
                return selectedLocations
                  .map((selectedLocation) => selectedLocation.name)
                  .join(", ");
              }}
              MenuProps={MenuProps}
            >
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  <Checkbox
                    checked={
                      location.id && selectedLocationIds.includes(location.id)
                        ? true
                        : false
                    }
                  />
                  <ListItemText primary={location.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <FileDropZone onFileSelected={onFileSelected} />
            {menuImage && (
              <Chip
                sx={{ mt: 2 }}
                label={menuImage.name}
                onDelete={() => setMenuImage(undefined)}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              onClick={createMenu}
              disabled={isDisabled}
              sx={{ mt: 2, width: "fit-content" }}
            >
              Create Menu
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreateMenu;
