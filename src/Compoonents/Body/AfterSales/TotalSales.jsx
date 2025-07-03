import styled from "styled-components";
import { BtnOne } from "../../../index.js";

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
          <BtnOne titulo="CHARGE" />
          <BtnOne titulo="..." />
        </section>
        <span>$ 9.99</span>
      </section>
    </Container>
  );
};

const Container = styled.div``;
