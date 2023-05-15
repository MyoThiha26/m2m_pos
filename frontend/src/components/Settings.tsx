import { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import { Company, Location } from "../typings/types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { company } = useContext(AppContext);
  const [companyInfo, setCompanyInfo] = useState<Company>({
    name: "",
    address: "",
  });
  const navigate = useNavigate();
  const { locations } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >();

  useEffect(() => {
    if (!accessToken) return navigate("/login");
    if (locations.length) {
      const selectedLocationId = localStorage.getItem("selectedLocation");
      if (!selectedLocationId) {
        localStorage.setItem("selectedLocation", String(locations[0].id));
        setSelectedLocation(locations[0]);
      } else {
        const selectedLocation = locations.find(
          (location) => String(location.id) === selectedLocationId
        );
        setSelectedLocation(selectedLocation);
      }
    }
    if (company) setCompanyInfo(company);
  }, [locations, accessToken, company]);

  const handleOnchange = (evt: SelectChangeEvent<number>) => {
    localStorage.setItem("selectedLocation", String(evt.target.value));
    const selectedLocation = locations.find(
      (location) => location.id === evt.target.value
    );
    setSelectedLocation(selectedLocation);
  };

  const updateCompany = async () => {
    const response = await fetch(
      `http://localhost:5000/settings/companies/${companyInfo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(companyInfo),
      }
    );
  };

  return (
    <Layout title="Settings">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          margin: "0 auto",
          mt: 5,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={companyInfo.name}
          sx={{ mb: 2 }}
          onChange={(evt) => {
            const name = evt.target.value;
            setCompanyInfo({ ...companyInfo, name });
          }}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={companyInfo.address}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setCompanyInfo({ ...companyInfo, address: evt.target.value })
          }
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Locations</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLocation ? selectedLocation.id : ""}
            label="Locations"
            onChange={handleOnchange}
          >
            {locations.map((location) => {
              return (
                <MenuItem key={location.id} value={location.id}>
                  {location.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ mt: 2, width: "fit-content" }}
          onClick={updateCompany}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default Settings;
