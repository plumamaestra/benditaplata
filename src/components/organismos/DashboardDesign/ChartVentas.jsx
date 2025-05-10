import styled from "styled-components";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
import { useVentasStore } from "../../../store/VentasStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useThemeStore } from "../../../store/ThemeStore";
import { useEffect, useState } from "react";
import { useSucursalesStore } from "../../../store/SucursalesStore";

export const ChartVentas = () => {
  const { dataempresa } = useEmpresaStore();
  const { sucursalesItemSelect } = useSucursalesStore();
  const { themeStyle } = useThemeStore();

  const [data, setData] = useState([]);
  const [totalPeriodo, setTotalPeriodo] = useState(0);
  const [porcentajeCambio, setPorcentajeCambio] = useState(0);

  useEffect(() => {
    const fetchChartData = async () => {
      const id_empresa = dataempresa?.id || (Array.isArray(dataempresa) ? dataempresa[0]?.id : undefined);
      const id_sucursal = sucursalesItemSelect?.id || (Array.isArray(sucursalesItemSelect) ? sucursalesItemSelect[0]?.id : undefined);
      if (!id_empresa || !id_sucursal) return;

      // Fechas para los últimos 7 días
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const dias = 7;
      let chartData = [];
      let totalActual = 0;
      let totalAnterior = 0;
      for (let i = dias - 1; i >= 0; i--) {
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() - i);
        const inicio = new Date(fecha);
        inicio.setHours(0, 0, 0, 0);
        const fin = new Date(fecha);
        fin.setHours(23, 59, 59, 999);
        const inicioISO = inicio.toISOString();
        const finISO = fin.toISOString();
        // Query ventas para ese día
        const { data: ventas } = await window.supabase
          .from("ventas")
          .select("monto_total")
          .eq("id_empresa", id_empresa)
          .eq("id_sucursal", id_sucursal)
          .gte("fecha", inicioISO)
          .lte("fecha", finISO)
          .in("estado", ["nueva", "confirmada"]);
        const totalDia = ventas && Array.isArray(ventas)
          ? ventas.reduce((sum, v) => sum + Number(v.monto_total || 0), 0)
          : 0;
        chartData.push({
          name: inicio.toLocaleDateString("es-DO", { weekday: "short", day: "numeric" }),
          total: totalDia,
        });
        if (i === 0) totalActual = totalDia;
        if (i === dias) totalAnterior = totalDia;
      }
      setData(chartData);
      setTotalPeriodo(chartData.reduce((sum, d) => sum + d.total, 0));
      // Calcular porcentaje de cambio respecto a los 7 días anteriores
      let anterior = 0;
      for (let i = dias; i < dias * 2; i++) {
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() - i);
        const inicio = new Date(fecha);
        inicio.setHours(0, 0, 0, 0);
        const fin = new Date(fecha);
        fin.setHours(23, 59, 59, 999);
        const inicioISO = inicio.toISOString();
        const finISO = fin.toISOString();
        const { data: ventas } = await window.supabase
          .from("ventas")
          .select("monto_total")
          .eq("id_empresa", id_empresa)
          .eq("id_sucursal", id_sucursal)
          .gte("fecha", inicioISO)
          .lte("fecha", finISO)
          .in("estado", ["nueva", "confirmada"]);
        anterior += ventas && Array.isArray(ventas)
          ? ventas.reduce((sum, v) => sum + Number(v.monto_total || 0), 0)
          : 0;
      }
      const porcentaje = anterior > 0 ? (((chartData.reduce((sum, d) => sum + d.total, 0)) - anterior) / anterior) * 100 : 0;
      setPorcentajeCambio(Math.round(porcentaje));
    };
    fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataempresa, sucursalesItemSelect]);

  const isPositive = porcentajeCambio > 0;
  const isNeutral = porcentajeCambio === 0;

  return (
    <Container>
      <Header>
        <Title>Total ventas</Title>
      </Header>
      <MainInfo>
        <Revenue>
          {FormatearNumeroDinero(totalPeriodo, dataempresa?.currency, dataempresa?.iso)}
        </Revenue>
        <Change>
          <Percentage>
            <Icon width="26" height="26"
              icon={
                isNeutral
                  ? "akar-icons:minus"
                  : isPositive
                  ? "iconamoon:arrow-up-2-fill"
                  : "iconamoon:arrow-down-2-fill"
              }
            ></Icon>
            56% al periodo anterior
          </Percentage>
        </Change>
      </MainInfo>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={themeStyle.text} stopOpacity={0.2} />
              <stop offset="95%" stopColor={themeStyle.text} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeOpacity={0.2} vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Area
            strokeWidth={1.5}
            type="monotone"
            dataKey="uv"
            stroke={themeStyle.text}
            fill="url(#colorValue)"
            activeDot={{ r: 6 }}
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};
const CustomTooltip = ({ active, payload, label }) => {
  const { dataempresa } = useEmpresaStore();
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <Date>{label} </Date>
        <Value>
          {FormatearNumeroDinero(
            payload[0].value,
            dataempresa?.currency,
            dataempresa?.iso
          )}
        </Value>
      </TooltipContainer>
    );
  }
};
const Container = styled.div`
 
`;
const TooltipContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 10px;
  border-radius: 8px;
  font-size: 12px;
  box-shadow: ${({ theme }) => theme.boxshadow};
`;
const Date = styled.div`
  font-size: 14px;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left:20px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;
const MainInfo = styled.div`
  margin: 20px 0;
  padding-left:20px;
`;
const Revenue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;
const Change = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;
const Percentage = styled.span`
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 14px;
  color: ${(props) =>
    props.isNeutral ? "#6b7280" : props.isPositive ? "#12ca3a" : "#d32f5b"};
`;
