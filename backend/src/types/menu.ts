export interface Menu {
  id?: string;
  name: string;
  price: number;
  imageUrl?: string;
  locationIds: string[];
  menuCategoryIds?: string[];
  addonCategoryIds?: string[];
}

export interface CreateMenuParams {
  name: string;
  price: number;
  locationIds: string[];
  imageUrl?: string;
}
