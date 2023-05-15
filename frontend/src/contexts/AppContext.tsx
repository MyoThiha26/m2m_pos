import { config } from "../config/config";
import {
  Addon,
  AddonCategory,
  Company,
  Location,
  Menu,
  MenuCategory,
  MenuLocation,
} from "../typings/types";
import { createContext, useEffect, useState } from "react";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menuLocations: MenuLocation[];
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menuLocations: [],
  company: null,
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
