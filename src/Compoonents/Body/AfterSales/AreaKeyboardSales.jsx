import styled from "styled-components";
import { BtnOne, TotalSales } from "../../../index.js";
import { Device } from "../../../Styles/BreakPionts.jsx";

export const AreaKeyboardSales = () => {
  return (
    <Container>
      <section className="type-sale">
        <article className="box">
          <BtnOne
            titulo="CASH"
            border="0"
            height="70px"
            width="100%"
            bgcolor="rgba(19, 133, 13, 0.507)"
          />
          <BtnOne
            titulo="CREDITS"
            border="0"
            height="70px"
            width="100%"
            bgcolor="rgba(133, 13, 13, 0.507)"
          />
        </article>
        <article className="box">
          <BtnOne
            titulo="CARD"
            border="0"
            height="70px"
            width="100%"
            bgcolor="rgba(133, 79, 13, 0.507)"
          />
          <BtnOne
            titulo="MIXED"
            border="0"
            height="70px"
            width="100%"
            bgcolor="rgba(49, 13, 133, 0.507)"
          />
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

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.color2};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
  width: calc(100% - 5px);
  border-radius: 15px;
  @media ${Device.desktop} {
    position: relative;
    width: auto;
    bottom: initial;
  }
  .type-sale {
    display: none;
    @media ${Device.desktop} {
      display: initial;
      padding: 5px;
    }
    .box {
      display: flex;
      gap: 10px;
      padding: 5px;
    }
  }
  .total {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    .subtotal {
      display: none;
      flex-direction: column;
      justify-content: end;
      text-align: end;
      gap: 10px;
      font-weight: 500;
      @media ${Device.desktop} {
        display: flex;
      }
    }
  }
`;
