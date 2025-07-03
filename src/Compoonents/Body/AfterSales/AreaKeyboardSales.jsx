import styled from "styled-components";
import { BtnOne, TotalSales } from "../../../index.js";

export const AreaKeyboardSales = () => {
  return (
    <Container>
      <section className="type-sale">
        <article className="box">
          <BtnOne titulo="CASH" />
          <BtnOne titulo="CREDITS" />
        </article>
        <article className="box">
          <BtnOne titulo="CARD" />
          <BtnOne titulo="MIXED" />
        </article>
      </section>
      <section className="total">
        <div className="subtotal">
          <span>
            Sub total: <strong>$ 9.99 </strong>
          </span>
          <span>IGV (18%): $ 0.00 </span>
          <span>
            Sub total: <strong>$ 9.99 </strong>
          </span>
        </div>
        <TotalSales />
      </section>
    </Container>
  );
};

const Container = styled.div``;
