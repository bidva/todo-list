import { Route } from "../utils";
import ItemService from "./items/itemService";

export let item: any = null;

// server

try {
  item = new ItemService();
} catch (e) {
  console.error(e);
}

export const getRoutes = (): any => {
  const itemsRoutes: Route[] = item.getRoutes();

  return [
    ...itemsRoutes,
  ];
};
