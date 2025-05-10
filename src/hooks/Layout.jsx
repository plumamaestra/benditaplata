import styled from "styled-components";
import {
  Sidebar,
  SwitchHamburguesa,
  Spinner1,
  useEmpresaStore,
  useUsuariosStore,
  MenuMovil,
  useSucursalesStore,
  useAuthStore,
  UserAuth,
} from "../index";
import { useState } from "react";
import { Device } from "../styles/breakpoints";
import { useQuery } from "@tanstack/react-query";
import { useAsignacionCajaSucursalStore } from "../store/AsignacionCajaSucursalStore";
import { usePermisosStore } from "../store/PermisosStore";
import { useMostrarSucursalAsignadasQuery } from "../tanstack/AsignacionesSucursalStack";
export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stateMenu, setStateMenu] = useState(false);

  const { mostrarusuarios } = useUsuariosStore();
  const { mostrarempresa } = useEmpresaStore();
    const { user } = UserAuth(); // Accedemos al contexto
  const id_auth = user?.id; // Obtenemos el id_auth del usuario autenticado
  const { mostrarSucursalCajaAsignada } = useAsignacionCajaSucursalStore();


  const {
    data: datausuarios,
    isLoading: isLoadingUsuarios,
    error: errorUsuarios,
    refetch: refetchUsuarios,
  } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: () => mostrarusuarios({ id_auth: id_auth }),
    refetchOnWindowFocus: false,
    enabled: !!id_auth,
  });

  const {
    data: dataSucursales,
    isLoading: isLoadingSucursales,
    error: errorSucursales,
  } = useMostrarSucursalAsignadasQuery();

  const {
    data: dataEmpresa,
    isLoading: isLoadingEmpresa,
    error: errorEmpresa,
  } = useQuery({
    queryKey: ["mostrar empresa", datausuarios?.id],
    queryFn: () => mostrarempresa({ _id_usuario: datausuarios?.id }),
    enabled: !!datausuarios,
    refetchOnWindowFocus: false,
  });

  // Consolidación de isLoading y error
  const isLoading =
    isLoadingUsuarios || isLoadingSucursales || isLoadingEmpresa;
  const error = errorUsuarios || errorSucursales || errorEmpresa;

  //  if (datausuarios == null) {
  //    refetchUsuarios();
  //  }
  if (isLoading) {
    return <Spinner1 />;
  }
  if (error) {
    return <span>error layout...{error.message} </span>;
  }
  return (
    <Container className={sidebarOpen ? "active" : ""}>
      <section className="contentSidebar">
        <Sidebar
          state={sidebarOpen}
          setState={() => setSidebarOpen(!sidebarOpen)}
        />
      </section>
      <section className="contentMenuhambur">
        <SwitchHamburguesa
          state={stateMenu}
          setstate={() => setStateMenu(!stateMenu)}
        />
        {stateMenu ? <MenuMovil setState={() => setStateMenu(false)} /> : null}
      </section>

      <Containerbody>{children}</Containerbody>
    </Container>
  );
}
const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  transition: 0.1s ease-in-out;
  color: ${({ theme }) => theme.text};
  .contentSidebar {
    display: none;
    /* background-color: rgba(78, 45, 78, 0.5); */
  }
  .contentMenuhambur {
    position: absolute;
    /* background-color: rgba(53, 219, 11, 0.5); */
  }
  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr;
    &.active {
      grid-template-columns: 260px 1fr;
    }
    .contentSidebar {
      display: initial;
    }
    .contentMenuhambur {
      display: none;
    }
  }
`;
const Containerbody = styled.section`
  /* background-color: rgba(231, 13, 136, 0.5); */
  grid-column: 1;
  width: 100%;

  @media ${Device.tablet} {
    margin-top: 0;
    grid-column: 2;
  }
`;
