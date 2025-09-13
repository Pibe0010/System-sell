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

const AreaSalesDetails = styled.section`
  display: flex;
  width: 100%;
`;
const ItemSales = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-right: 10px;
  .content-description {
    display: flex;
    flex-direction: column;
    .description {
      font-weight: 700;
      font-size: 20px;
    }
  }
`;
