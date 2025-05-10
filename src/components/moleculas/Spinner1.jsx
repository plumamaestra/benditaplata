import styled from "styled-components";
import { Lottieanimacion } from "../atomos/Lottieanimacion";
import canguroLoading from "../../assets/canguro-loading.json";
export function Spinner1() {
  return (
    <Container>
      <Lottieanimacion alto={220} ancho={220} animacion={canguroLoading} />
    </Container>
  );
}
const Container =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:100vh;
`