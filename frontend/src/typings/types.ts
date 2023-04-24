interface BaseType {
  id?: number;
  name: string;
}

export interface Menu extends BaseType {
  price: number;
  isAvailable?: boolean;
}

export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
  price: number;
  isAvailable: boolean;
  addonCategoriesIds: string[];
}

export interface AddonCategory extends BaseType {
  isRequired: boolean;
}

export interface Location extends BaseType {
  address?: string;
}

export interface MenuLocation {
  id: number;
  menus_id: number;
  locations_id: number;
  is_available: boolean;
}
