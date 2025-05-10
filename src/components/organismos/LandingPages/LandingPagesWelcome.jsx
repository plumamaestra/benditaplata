import React, { useEffect } from "react";
import styled from "styled-components";
import { CardFuncion } from "./CardFuncion";
import { Device } from "../../../styles/breakpoints";
import ScrollReveal from "scrollreveal";
import { BtnLink } from "../../moleculas/BtnLink";
import { useUsuariosStore } from "../../../store/UsuariosStore";
export const LandingPagesWelcome = () => {
  const {datausuarios} = useUsuariosStore()
  useEffect(() => {
    ScrollReveal().reveal(".left-section", {
      origin: "left",
      distance: "100px",
      duration: 1000,
      easing: "ease-in-out",
    });

    ScrollReveal().reveal(".right-section", {
      origin: "right",
      distance: "100px",
      duration: 1000,
      easing: "ease-in-out",
    });
    ScrollReveal().reveal(".footer-section", {
      origin: "bottom",
      distance: "100px",
      duration: 1000,
      easing: "ease-in-out",
      delay: 200,
    });
  }, []);

  return (
    <Container>
      <ContentSection>
        <SubContentSection>
          <LeftSection className="left-section">
            <h1>Controla y haz crecer tu negocio con nuestro Sistema POS</h1>
<Step>
  <IconPlaceholder>
    <img src="https://i.ibb.co/3dZfQzF/caja-registradora.png" />
  </IconPlaceholder>
  <Text>
    <Title>Control total de ventas e inventario</Title>
    <Description>
      Lleva el registro de todas tus ventas y movimientos de inventario en tiempo real. Evita pérdidas y toma mejores decisiones.
    </Description>
  </Text>
</Step>
<Step>
  <IconPlaceholder>
    <img src="https://i.ibb.co/HCF7jnx/escaparate.png" />
  </IconPlaceholder>
  <Text>
    <Title>Reportes claros y útiles</Title>
    <Description>
      Obtén reportes automáticos de ventas, productos más vendidos y desempeño de tu negocio. Todo en un solo lugar.
    </Description>
  </Text>
</Step>
<Step>
  <IconPlaceholder>
    <img src="https://qkzybkelsdmoezaaypou.supabase.co/storage/v1/object/public/imagenes/modulos/impresora.png" />
  </IconPlaceholder>
  <Text>
    <Title>Fácil de usar y con soporte</Title>
    <Description>
      Diseñado para empresas y vendedores independientes. Accede desde cualquier lugar, recibe soporte personalizado y paga solo por lo que usas.
    </Description>
  </Text>
</Step>
<div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
  <BtnLink url={"#contacto-pos"} color={"#fff"} bgcolor={"#28a745"} titulo={"Solicita una demo gratuita"} />
  <BtnLink url={"mailto:info@canguropos.com"} color={"#2f2f2f"} bgcolor={"#ffffff"} titulo={"Contáctanos"} />
</div>
          </LeftSection>
          <RightSection className="right-section">
            <MockupImage>
              <CardFuncion
                top="10px"
                bgcontentimagen={"#fccdb8"}
                left={"-50px"}
                title={"Multi-empresa"}
                imagen={"https://i.ibb.co/HCF7jnx/escaparate.png"}
              />
              <CardFuncion
                top="110px"
                bgcontentimagen={"#e3d4cc"}
                left={"-20px"}
                title={"Multi-sucursal"}
                imagen={"https://i.ibb.co/MV6xZz4/franquicia.png"}
              />
              <CardFuncion
                top="210px"
                bgcontentimagen={"#aee0fd"}
                left={"-50px"}
                title={"Multi-caja"}
                imagen={
                  "https://i.ibb.co/3dZfQzF/caja-registradora.png"
                }
              />
              <CardFuncion
                top="310px"
                bgcontentimagen={"#fdc2b7"}
                left={"-20px"}
                title={"Multi-almacen"}
                imagen={
                  "https://qkzybkelsdmoezaaypou.supabase.co/storage/v1/object/public/imagenes/modulos/almacen.png"
                }
              />
               <CardFuncion
                top="410px"
                bgcontentimagen={"#52e0f9"}
                left={"-50px"}
                title={"Imprime directo"}
                subtitle={"sin cuadro de diálogo"}
                imagen={
                  "https://qkzybkelsdmoezaaypou.supabase.co/storage/v1/object/public/imagenes/modulos/impresora.png"
                }
              />
            </MockupImage>
          </RightSection>
        </SubContentSection>
      </ContentSection>

      <Footer className="footer-section">
        <FooterTitle>Tecnologias utilizadas:</FooterTitle>
        <FooterContent>
          <FooterItem>
            <FooterIcon>
              <img src="https://i.ibb.co/3vfgvTB/mujer-de-negocios.png" />
            </FooterIcon>
            <FooterText>
              <FooterTextTitle>FRONTEND</FooterTextTitle>
              <FooterDescription>
                React.js | TansTask | Zustand | Styled Components
              </FooterDescription>
            </FooterText>
          </FooterItem>
          <FooterItem>
            <FooterIcon>
              <img src="https://i.ibb.co/4fDChm8/nalga-1.png" />
            </FooterIcon>
            <FooterText>
              <FooterTextTitle>BACKEND</FooterTextTitle>
              <FooterDescription>PostgreSQL | SUPABASE</FooterDescription>
            </FooterText>
          </FooterItem>
        </FooterContent>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;
  @media ${Device.desktop} {
    height: calc(100vh - 40px);
  }
`;
const SubContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media ${Device.desktop} {
    flex-direction: row;
    justify-content: space-between;
    width: 60%;
  }
`;

const ContentSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  h1 {
    text-align: center;
    font-size:35px;
  }
  @media ${Device.desktop} {
    align-items: flex-start;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  @media ${Device.desktop} {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
`;

const IconPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  border: 4px solid #f0f0f0;
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
  @media ${Device.tablet} {
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0;

  @media ${Device.desktop} {
    font-size: 18px;
  }
`;

const Description = styled.p`
  font-size: 13px;
  margin: 5px 0 0;

  @media ${Device.desktop} {
    font-size: 14px;
  }
`;

const Highlight = styled.span`
  color: #0077ff;
  cursor: pointer;
`;

const RegisterButton = styled.button`
  background-color: #ff6a00;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  &:hover {
    background-color: #e65c00;
  }

  @media ${Device.desktop} {
    align-self: flex-start;
    font-size: 16px;
  }
`;

const RightSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  border-left: none;
  margin-top: 20px;

  @media ${Device.desktop} {
    margin-top: 0;
  }
`;

const MockupImage = styled.div`
  width: 250px;
  height: 500px;
  background-color: #e0e0e0;
  border-radius: 20px;
  border: 6px solid #fff;
  position: relative;
  &::before {
    content: "";
    height: 360px;
    width: 360px;
    background-color: rgba(0, 51, 160, 0.1);
    position: absolute;
    z-index: -1;
    margin: auto;
    bottom: 20%;
    left: -60px;
    border-radius: 50%;
    animation: palpitar 3s infinite;
  }
  @keyframes palpitar {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  @media ${Device.desktop} {
    width: 250px;
    height: 500px;
  }
`;

const Footer = styled.div`
  background-color: #0033a0;
  color: white;
  width: 100%;
  text-align: center;
  border-radius: 8px;
  padding: 10px 0 10px 0;
`;

const FooterTitle = styled.h4`
  font-size: 18px;

  @media ${Device.desktop} {
    font-size: 20px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media ${Device.desktop} {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
  }
`;

const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  @media ${Device.desktop} {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
`;

const FooterIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #fcece4;
  border-radius: 50%;
  img {
    width: 100%;
  }
  @media ${Device.desktop} {
    width: 60px;
    height: 60px;
  }
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTextTitle = styled.h5`
  font-size: 15px;
  margin: 0;

  @media ${Device.desktop} {
    font-size: 16px;
  }
`;

const FooterDescription = styled.p`
  font-size: 13px;

  @media ${Device.desktop} {
    font-size: 14px;
  }
`;
