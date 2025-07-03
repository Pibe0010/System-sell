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
  background-color: rgba(137, 5, 252, 0.5);
  display: none;
  @media ${Device.desktop} {
    display: flex;
  }
`;
