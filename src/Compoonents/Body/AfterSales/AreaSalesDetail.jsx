import styled from "styled-components";

export const AreaSalesDetail = () => {
  return (
    <AreaSalesDetails>
      <ItemSales>
        <article className="content-description">
          <span className="description">Mona china - $ 9.99</span>
          <span>📦Stock: 100 UND</span>
        </article>
        <article>
          <span className="details">
            ⚡<strong>Countity:</strong> 1 UND <strong>Import:</strong> $ 9.99
          </span>
        </article>
      </ItemSales>
    </AreaSalesDetails>
  );
};

const ItemSales = styled.section``;
const AreaSalesDetails = styled.section``;
