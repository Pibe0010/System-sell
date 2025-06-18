import { create } from "zustand";
import {
  AddCategory,
  DeleteCategory,
  InsertCategory,
  SearchCategory,
  UpdateCategory,
} from "../index.js";

export const useCategoriesStore = create((set, get) => ({
  search: "",
  setSearch: (params) => {
    set({ search: params });
  },
  dataCategories: [],
  categoriesItemSelect: [],
  insertParams: {},
  addCategories: async (params) => {
    const response = await AddCategory(params);
    set({ insertParams: params });
    set({ dataCategories: response });
    set({ categoriesItemSelect: response[0] });
    return response;
  },

  selectCategories: (params) => {
    set({ categoriesItemSelect: params });
  },

  insertCategories: async (params) => {
    await InsertCategory(params, file);
    const { addCategories } = get();
    const { insertParams } = get();
    set(addCategories(insertParams));
  },

  deleteCategories: async (params) => {
    await DeleteCategory(params);
    const { addCategories } = get();
    const { insertParams } = get();
    set(addCategories(insertParams));
  },

  updateCategories: async (params, fileOld, fileNew) => {
    await UpdateCategory(params, fileOld, fileNew);
    const { addCategories } = get();
    const { insertParams } = get();
    set(addCategories(insertParams));
  },

  searchCategories: async (params) => {
    const response = await SearchCategory(params);
    set({ dataCategories: response });
    return response;
  },
}));
