import { useQuery } from "@tanstack/react-query";
import { UsuariosTemplate } from "../components/templates/UsuariosTemplate";
import { useEmpresaStore } from "../store/EmpresaStore";
import { useAsignacionCajaSucursalStore } from "../store/AsignacionCajaSucursalStore";
import { BarLoader } from "react-spinners";

export const Usuarios = () => {
  const { dataempresa } = useEmpresaStore();
  const { mostrarUsuariosAsignados,buscarUsuariosAsignados,buscador } = useAsignacionCajaSucursalStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar usuarios asignados", { id_empresa: dataempresa?.id }],
    queryFn: () => mostrarUsuariosAsignados({ _id_empresa: dataempresa?.id }),
    enabled: !!dataempresa,
  });
  const { isLoading:isloadingbuscarusuarios, error:errorBuscarUser } = useQuery({
    queryKey: ["buscar usuarios asignados", { id_empresa: dataempresa?.id,buscador:buscador }],
    queryFn: () => buscarUsuariosAsignados({ _id_empresa: dataempresa?.id ,buscador:buscador}),
    enabled: !!dataempresa,
  });
  if (isLoading) return <BarLoader color="#6d6d6d" />;
  if (error) return <span>error...{error.message}</span>;
  return <UsuariosTemplate />;
};
