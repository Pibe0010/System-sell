import styled from "styled-components";

export const AfterSalesTemplate = () => {
  return (
    <Container>
      <span>AfterSales</span>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  color: ${({ theme }) => theme.text};
`;
