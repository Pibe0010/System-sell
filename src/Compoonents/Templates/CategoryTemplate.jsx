import styled from "styled-components";
import { BtnOne, Title } from "../../index.js";
import { v } from "../../Styles/variables.jsx";

export const CategoryTemplate = () => {
  return (
    <Container>
      <section className="area1">
        <Title>Categories</Title>
        <BtnOne
          bgcolor={v.colorPrincipal}
          titulo="New"
          icono={<v.iconoagregar />}
        />
      </section>
      <section className="main">main</section>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  padding: 15px;
  display: grid;
  grid-template: "area1" 60px "main" auto;
  .area1 {
    grid-area: area1;
    background-color: rgba(70, 241, 70, 0.3);
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
  }
  .main {
    grid-area: main;
    background-color: rgba(235, 58, 58, 0.3);
  }
`;
