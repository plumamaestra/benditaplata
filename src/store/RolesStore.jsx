import { create } from "zustand";
import { MostrarRoles } from "../supabase/crudRol";

export const useRolesStore = create((set) => ({
  rolesItemSelect: [],
  setRolesItemSelect: (p) => {
    set({ rolesItemSelect: p });
  },
  mostrarRoles: async () => {
    const response = await MostrarRoles();
    set({
      rolesItemSelect: response[0],
    });
    return response;
  },
}));
