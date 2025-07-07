import styled from "styled-components";
import { BtnOne } from "../../../index.js";
import { Device } from "../../../Styles/BreakPionts.jsx";
import { Icon } from "@iconify/react/dist/iconify.js";

export const TotalSales = () => {
  return (
    <Container>
      <section className="image">
        <img
          src="https://img.icons8.com/ios/50/000000/cash.png"
          alt="icon paid"
        />
      </section>
      <section className="content-total">
        <section className="content-title">
          <BtnOne
            titulo="BUY"
            icono={<Icon icon="fa:money" />}
            bgcolor="#fff"
            color="#207c33"
            border="2px"
          />
          <BtnOne
            titulo="..."
            icono={<Icon icon="icon-park-twotone:other" />}
            bgcolor="#0be81e"
            border="2px"
          />
        </section>
        <span>$ 9.99</span>
      </section>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 40px;
  background-color: #3ff563;
  padding: 10px;
  color: #207c33;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    background-color: #7fff99;
    position: absolute;
    border-radius: 50%;
    top: -20px;
    left: -15px;
  }
  &::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.bgtotal};
    position: absolute;
    border-radius: 50%;
    top: 5px;
    right: 5px;
  }
  .image {
    z-index: 1;
    width: 55px;
    position: relative;
    @media ${Device.desktop} {
      bottom: initial;
    }
    .img {
      width: 100%;
    }
  }
  .content-total {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .content-title {
      display: flex;
      align-items: center;
      margin-top: 30px;
      gap: 10px;
      @media ${Device.desktop} {
        display: none;
      }
    }
  }
`;
