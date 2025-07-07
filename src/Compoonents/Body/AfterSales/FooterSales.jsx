import styled from "styled-components";
import { Device } from "../../../Styles/BreakPionts.jsx";
import { BtnOne } from "../../../index.js";

export const FooterSales = () => {
  return (
    <Footer>
      <article className="content">
        <BtnOne titulo="Delete" />
        <BtnOne titulo="Add sales and returns" />
      </article>
    </Footer>
  );
};

const Footer = styled.section`
  grid-area: footer;
  display: none;
  align-items: center;
  @media ${Device.desktop} {
    display: flex;
  }
  .content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
