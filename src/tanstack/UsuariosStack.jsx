import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUsuariosStore } from "..";
import { toast } from "sonner";

export const useEditarPerfilMutation = () => {
  const queryClient = useQueryClient()
  const { editarUsuarios, datausuarios } = useUsuariosStore();

  return useMutation({
    mutationKey: ["editar perfil"],
    mutationFn: async (data) => {
      const p = {
        id: datausuarios?.id,
        nombres: data.nombres,
        nro_doc: data.nro_doc,
        telefono: data.telefono,
      };
      await editarUsuarios(p);

    },
    onError: (error) =>{
      toast.error("Error al editar mi perfil: " +error.message)

    },
    onSuccess:()=>{
      toast.success("Datos guardados")
      queryClient.invalidateQueries(["mostrar usuarios"])
    }
  });
};
