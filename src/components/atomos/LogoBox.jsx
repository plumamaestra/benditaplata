import React from "react";
import styled from "styled-components";
import { v } from "../../styles/variables";

const Box = styled.div`
  background: #134E4A;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  aspect-ratio: 1/1;
  padding: 0;
`;

const Img = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
  display: block;
`;

const LogoBox = ({ style, className }) => (
  <Box style={style} className={className}>
    <Img src={v.logo} alt="Logo" />
  </Box>
);

export default LogoBox;
