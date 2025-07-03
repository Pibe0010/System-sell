import styled from "styled-components";
import { Device } from "../../Styles/BreakPionts";
import {
  AreaKeyboardSales,
  AreaSalesDetail,
  FooterSales,
  HeaderSales,
} from "../../index.js";

export const AfterSalesTemplate = () => {
  return (
    <Container>
      <HeaderSales />
      <Main>
        <AreaSalesDetail />
        <AreaKeyboardSales />
      </Main>
      <FooterSales />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template:
    "header"
    "main";
  @media ${Device.desktop} {
    grid-template:
      "header" "header"
      "main" "main"
      "footer" "footer";
  }
  color: ${({ theme }) => theme.text};
`;
const Main = styled.div`
  grid-area: main;
  background-color: rgba(13, 0, 255, 0.5);
`;
