import { config } from "../config/config";
import { Addon, AddonCategory, Menu, MenuCategory } from "../typings/types";
import { createContext, useEffect, useState } from "react";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  updateData: (value: any) => void;
  fetchData: () => void;
}

const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}/data`);
    const responseJson = await response.json();
    const { menus, menuCategories, addons, addonCategories } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
