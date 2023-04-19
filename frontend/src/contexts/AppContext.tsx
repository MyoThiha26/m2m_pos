import { createContext } from "vm";
import { Addon, AddonCategory, Menu, MenuCategory } from "../typings/types";
import { useContext, useState } from "react";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
}

const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
};

export const AppContext = createContext(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);

  return (
    <AppContext.Provider value={{ ...data }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
