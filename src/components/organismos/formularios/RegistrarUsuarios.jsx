import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  useSucursalesStore,
  ConvertirCapitalize,
  useEmpresaStore,
  useUsuariosStore,
  Device,
} from "../../../index";
import { useForm } from "react-hook-form";
import { BtnClose } from "../../ui/buttons/BtnClose";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCajasStore } from "../../../store/CajasStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SelectList } from "../../ui/lists/SelectList";
import { BarLoader } from "react-spinners";
import { PermisosUser } from "../UsuariosDesign/PermisosUser";
import { useRolesStore } from "../../../store/RolesStore";
export function RegistrarUsuarios({ accion, dataSelect,onClose }) {
  const queryClient = useQueryClient();
  const {
    cajaSelectItem,
    setStateCaja,
    insertarCaja,
    editarCaja,
    mostrarCajaXSucursal,
    setCajaSelectItem,
  } = useCajasStore();
  const { insertarUsuario } = useUsuariosStore();
  const { dataempresa } = useEmpresaStore();
  const { mostrarSucursales, sucursalesItemSelect, selectSucursal } =
    useSucursalesStore();
  const { rolesItemSelect } = useRolesStore();
  const { data: dataSucursales, isLoading: isloadingSucursales } = useQuery({
    queryKey: ["mostrar sucursales", { id_empresa: dataempresa?.id }],
    queryFn: () => mostrarSucursales({ id_empresa: dataempresa?.id }),
    enabled: !!dataempresa,
  });
  const { data: dataCaja, isLoading: isloadingCajas } = useQuery({
    queryKey: [
      "mostrar caja por sucursal",
      { id_sucursal: sucursalesItemSelect?.id },
    ],
    queryFn: () =>
      mostrarCajaXSucursal({ id_sucursal: sucursalesItemSelect?.id }),
    enabled: !!sucursalesItemSelect,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const insertar = async (data) => {
    const p = {
      id: accion === "Editar" ? dataSelect?.id : null,
      nombres: data.nombres,
      nro_doc: data.nro_doc,
      telefono: data.telefono,
      id_rol: rolesItemSelect?.id,
      correo: data.email,
      //datos asignacion caja y sucursal
      id_sucursal: sucursalesItemSelect?.id,
      id_caja: cajaSelectItem?.id,
      //datos credenciales
      email: data.email,
      pass: data.pass,
    };
    if (accion === "Editar") {
    } else {
      await insertarUsuario(p);
    }
  };
  const { isPending, mutate: doInsertar } = useMutation({
    mutationKey: ["insertar usuarios"],
    mutationFn: insertar,
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Usuario registrado correctamente");
      queryClient.invalidateQueries(["mostrar usuarios asignados"]);
      onClose();
    },
  });

  const manejadorInsertar = (data) => {
    doInsertar(data);
  };
  const isLoading = isloadingSucursales || isloadingCajas;
  if (isLoading) return <BarLoader color="#6d6d6d" />;
  return (
    <Container>
      {isPending ? (
        <span>guardando...🔼</span>
      ) : (
        <Form onSubmit={handleSubmit(manejadorInsertar)}>
          <Header>
            <Title>
              {accion === "Editar" ? "Editar usuario" : "Registrar usuario"}
            </Title>
            <BtnClose funcion={onClose}/>
          </Header>
          <section className="main">
            <section className="area1">
              <article>
                <InputText
                  icono={
                    <Icon
                      icon="material-symbols-light:stacked-email-outline-rounded"
                      width="24"
                      height="24"
                    />
                  }
                >
                  <input
                    className="form__field"
                    defaultValue={
                      accion === "Editar" ? dataSelect?.descripcion : ""
                    }
                    type="text"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  <label className="form__label">email</label>
                  {errors.email?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText
                  icono={
                    <Icon
                      icon="material-symbols-light:stacked-email-outline-rounded"
                      width="24"
                      height="24"
                    />
                  }
                >
                  <input
                    className="form__field"
                    defaultValue={
                      accion === "Editar" ? dataSelect?.descripcion : ""
                    }
                    type="password"
                    {...register("pass", {
                      required: true,
                    })}
                  />
                  <label className="form__label">contraseña</label>
                  {errors.pass?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText
                  icono={
                    <Icon
                      icon="icon-park-solid:edit-name"
                      width="24"
                      height="24"
                    />
                  }
                >
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.nombres}
                    type="text"
                    {...register("nombres", { required: true })}
                  />
                  <label className="form__label">Nombres</label>
                  {errors.nombres?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText
                  icono={
                    <Icon
                      icon="solar:document-outline"
                      width="24"
                      height="24"
                    />
                  }
                >
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.nro_doc}
                    type="number"
                    {...register("nro_doc", { required: true })}
                  />
                  <label className="form__label">Nro. doc</label>
                  {errors.nrodoc?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText
                  icono={
                    <Icon
                      icon="solar:document-outline"
                      width="24"
                      height="24"
                    />
                  }
                >
                  <input
                    className="form__field"
                    defaultValue={dataSelect?.telefono}
                    type="text"
                    {...register("telefono", { required: true })}
                  />
                  <label className="form__label">Teléfono</label>
                  {errors.telefono?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <span>Asignación de caja</span>
              <article className="contentasignacion">
                <span>Sucursal:</span>
                <SelectList
                  onSelect={selectSucursal}
                  itemSelect={sucursalesItemSelect}
                  displayField="nombre"
                  data={dataSucursales}
                />
              </article>
              <article className="contentasignacion">
                <span>Caja:</span>
                <SelectList
                  onSelect={setCajaSelectItem}
                  itemSelect={cajaSelectItem}
                  displayField="descripcion"
                  data={dataCaja}
                />
              </article>
              <Btn1 titulo={"Guardar"} bgcolor={"#2c2ca8"} color={"#fff"} />
            </section>
            <section className="area2">
              <PermisosUser />
            </section>
          </section>
        </Form>
      )}
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.body};
  padding: 20px;
  border-radius: 8px;
  position: relative;
  overflow-y: auto;
  max-height: 90vh;
  width: 100%;
  margin: 10px;
  border: 1px solid ${({ theme }) => theme.bg};
  .main {
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-y: auto;
    @media ${Device.laptop} {
      
    }
    .area1 {
      display: flex;
      flex-direction: column;
      height: 100%;
      align-items: center;
    }
  }
`;
const Header = styled.div`
  width: 100%;
  display: flex;
`;
const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
`;
