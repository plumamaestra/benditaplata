import styled from "styled-components";
import { Device } from "../../styles/breakpoints";
import { DashboardHeader } from "../organismos/DashboardDesign/DashboardHeader";
import { CardTotales } from "../organismos/DashboardDesign/CardTotales";
import { ChartVentas } from "../organismos/DashboardDesign/ChartVentas";
import {ChartProductosTop5} from "../organismos/DashboardDesign/ChartProductosTop5"
import { CardMovimientosCajaLive } from "../organismos/DashboardDesign/CardMovimientosCajaLive";
import {CardProductosTopMonto} from "../organismos/DashboardDesign/CardProductosTopMonto"
import { useEffect, useState } from "react";
import { useEmpresaStore } from "../../store/EmpresaStore";
import { useSucursalesStore } from "../../store/SucursalesStore";
import { useVentasStore } from "../../store/VentasStore";
import { useDetalleVentasStore } from "../../store/DetalleVentasStore";
import { useClientesProveedoresStore } from "../../store/ClientesProveedoresStore";

export const DashboardTemplate = () => {
  const { dataempresa } = useEmpresaStore();
  const { sucursalesItemSelect } = useSucursalesStore();
  const { mostrarventasxsucursal } = useVentasStore();
  const { datadetalleventa, mostrardetalleventa } = useDetalleVentasStore();
  const { mostrarCliPro, dataclipro } = useClientesProveedoresStore();

  const [ventasHoy, setVentasHoy] = useState(0);
  const [productosVendidosHoy, setProductosVendidosHoy] = useState(0);
  const [clientesRegistrados, setClientesRegistrados] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Obtener IDs de empresa y sucursal
      const id_empresa = dataempresa?.id || (Array.isArray(dataempresa) ? dataempresa[0]?.id : undefined);
      const id_sucursal = sucursalesItemSelect?.id || (Array.isArray(sucursalesItemSelect) ? sucursalesItemSelect[0]?.id : undefined);
      if (!id_empresa || !id_sucursal) return;

      // Fecha de hoy en formato YYYY-MM-DD
      const today = new Date();
      const fechaInicio = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      const fechaFin = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
      const fechaInicioISO = fechaInicio.toISOString();
      const fechaFinISO = fechaFin.toISOString();

      // Ventas de hoy
      const { data: ventas, error: errorVentas } = await window.supabase
        .from("ventas")
        .select("monto_total, id, cantidad_productos")
        .eq("id_empresa", id_empresa)
        .eq("id_sucursal", id_sucursal)
        .gte("fecha", fechaInicioISO)
        .lte("fecha", fechaFinISO)
        .in("estado", ["nueva", "confirmada"]);
      let totalVentas = 0;
      let totalProductos = 0;
      if (ventas && Array.isArray(ventas)) {
        totalVentas = ventas.reduce((sum, v) => sum + Number(v.monto_total || 0), 0);
        totalProductos = ventas.reduce((sum, v) => sum + Number(v.cantidad_productos || 0), 0);
      }
      setVentasHoy(totalVentas);
      setProductosVendidosHoy(totalProductos);

      // Clientes registrados
      await mostrarCliPro({ tipo: "cliente", id_empresa });
      setClientesRegistrados(Array.isArray(dataclipro) ? dataclipro.length : 0);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataempresa, sucursalesItemSelect]);

  return (
    <Container>
      <DashboardHeader />
      <MainContent>
        <Area1>
          <ContentTotales>
            <CardTotales
              percentage={0}
              value={ventasHoy}
              title="Ventas Hoy"
              icon={"mdi:dollar"}
            />
          </ContentTotales>
          <ContentTotales>
            <CardTotales
              percentage={0}
              value={productosVendidosHoy}
              title="Productos Vendidos Hoy"
              icon={"mdi:cart"}
            />
          </ContentTotales>
          <ContentTotales>
            <CardTotales
              percentage={0}
              value={clientesRegistrados}
              title="Clientes Registrados"
              icon={"mdi:account-group"}
            />
          </ContentTotales>
        </Area1>
        <Area2>
          <ChartVentas />
        </Area2>
        <Area3>
        <ChartProductosTop5/>
        </Area3>
        <Area4>
        <CardMovimientosCajaLive/>
        <CardProductosTopMonto/>
        </Area4>
      </MainContent>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-width: 1400px;
  margin: auto;
  gap: 20px;
  padding: 20px;
`;
const MainContent = styled.div`
  display: grid;
  grid-template-areas:
    "area1"
    "area2"
    "area3"
    "area4";
  grid-template-columns: 1fr;
  gap: 15px;
  @media ${Device.desktop} {
    grid-template-areas:
      "area1 area1 area3"
      "area2 area2 area3"
      "area4 area4 area4";
    grid-template-columns: 2fr 1fr 1fr;
    gap: 20px;
  }
`;
const Area1 = styled.section`
  grid-area: area1;
  /* background-color: rgba(242, 8, 242, 0.2); */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media ${Device.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Area2 = styled.section`
  grid-area: area2;
  /* background-color: rgba(17, 228, 84, 0.2); */
  border: 2px solid ${({ theme }) => theme.bordercolorDash};
  box-shadow: ${({ theme }) => theme.boxshadow};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.body};
`;
const Area3 = styled.section`
  grid-area: area3;
  background-color: ${({ theme }) => theme.body};
  border: 2px solid ${({ theme }) => theme.bordercolorDash};
  border-radius: 20px;
  /* background-color: rgba(21, 56, 231, 0.2); */
`;
const Area4 = styled.section`
  grid-area: area4;

  display:flex;
  gap:20px;
  flex-wrap:wrap;
  @media ${Device.desktop} {
    flex-wrap:nowrap;
  }
`;
const ContentTotales = styled.div`
  background-color: ${({ theme }) => theme.body};
  padding: 10px;
  border-radius: 20px;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.bordercolorDash};
  box-shadow: ${({ theme }) => theme.boxshadow};
`;
