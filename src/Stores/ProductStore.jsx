import { create } from "zustand";
import {
  AddProduct,
  DeleteProduct,
  GeneratorCode,
  InsertProduct,
  SearchProduct,
  UpdateProduct,
} from "../index.js";

export const useProductsStore = create((set, get) => ({
  search: "",
  setSearch: (params) => {
    set({ search: params });
  },
  dataProduct: [],
  ProductItemSelect: [],
  insertParams: {},
  addProduct: async (params) => {
    const response = await AddProduct(params);
    set({ insertParams: params });
    set({ dataProduct: response });
    set({ ProductItemSelect: response[0] });
    return response;
  },

  selectProduct: (params) => {
    set({ ProductItemSelect: params });
  },

  insertProduct: async (params) => {
    await InsertProduct(params);
    const { addProduct } = get();
    const { insertParams } = get();
    set(addProduct(insertParams));
  },

  deleteProduct: async (params) => {
    await DeleteProduct(params);
    const { addProduct } = get();
    const { insertParams } = get();
    set(addProduct(insertParams));
  },

  updateProduct: async (params) => {
    await UpdateProduct(params);
    const { addProduct } = get();
    const { insertParams } = get();
    set(addProduct(insertParams));
  },

  searchProduct: async (params) => {
    const response = await SearchProduct(params);
    set({ dataProduct: response });
    return response;
  },

  codeGenerator: 0,
  generatorCode: () => {
    const response = GeneratorCode({ id: 2 });
    set({ codeGenerator: response });
  },
}));
