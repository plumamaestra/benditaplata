import { create } from "zustand";
import {
  EliminarUsuarioAsignado,
  InsertarCredencialesUser,
  InsertarUsuarios,
  MostrarUsuarios,
  ObtenerIdAuthSupabase,

  supabase,
} from "../index";
import { InsertarAsignacionCajaSucursal } from "../supabase/crudAsignacionCajaSucursal";
import { usePermisosStore } from "./PermisosStore";
import { InsertarPermisos } from "../supabase/crudPermisos";
const tabla = "usuarios";
export const useUsuariosStore = create((set) => ({
  refetchs: null,
  datausuarios: [],
  mostrarusuarios: async (p) => {
    // const idauth = await ObtenerIdAuthSupabase();
    const response = await MostrarUsuarios(p);
    set({ datausuarios: response });

    return response;
  },
  eliminarUsuarioAsignado: async (p) => {
    await EliminarUsuarioAsignado(p);
  },
  insertarUsuario: async (p) => {
    const selectModules = usePermisosStore.getState().selectedModules || [];
    console.log("Módulos seleccionados:", selectModules);
    const data = await InsertarCredencialesUser({
      email: p.email,
      pass: p.pass,
    });
    const dataUserNew = await InsertarUsuarios({
      nombres: p.nombres,
      nro_doc: p.nro_doc,
      telefono: p.telefono,
      id_rol: p.id_rol,
      correo: p.email,
      id_auth: data,
    });
    await InsertarAsignacionCajaSucursal({
      id_sucursal: p.id_sucursal,
      id_usuario: dataUserNew?.id,
      id_caja: p.id_caja,
    });

    if (Array.isArray(selectModules) && selectModules.length > 0) {
      selectModules.forEach(async (idModule) => {
        let p = {
          id_usuario: dataUserNew?.id,
          idmodulo: idModule,
        };
        await InsertarPermisos(p);
      });
    } else {
      throw new Error("No hay módulos seleccionados");
    }
  },
  editarUsuarios: async (p) => {
    const { error } = await supabase.from(tabla).update(p).eq("id", p.id);
    if (error) {
      throw new Error(error.message);
    }
  },
}));
