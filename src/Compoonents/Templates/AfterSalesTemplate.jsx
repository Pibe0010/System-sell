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
  height: calc(100vh - 20px);
  display: grid;
  padding: 10px;
  gap: 10px;
  grid-template:
    "header" 230px
    "main" auto;
  @media ${Device.desktop} {
    grid-template:
      "header header" 140px
      "main main"
      "footer footer";
  }
  color: ${({ theme }) => theme.text};
`;
const Main = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
  gap: 10px;
  @media ${Device.desktop} {
    flex-direction: row;
  }
`;
