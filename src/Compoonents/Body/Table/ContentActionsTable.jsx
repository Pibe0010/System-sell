import styled from "styled-components";
import { ActionsTable } from "../../../index.js";
import { v } from "../../../Styles/variables.jsx";
import { Icon } from "@iconify/react";

export function ContentActionsTable({ funcionEditar, funcionEliminar }) {
  return (
    <Container>
      <ActionsTable
        funcion={funcionEditar}
        fontSize="18px"
        color="#7d7d7d"
        icono={<v.iconeditarTabla />}
      />
      <ActionsTable
        funcion={funcionEliminar}
        fontSize="20px"
        color="#f76e8e"
        icono={<Icon icon="fluent-emoji-high-contrast:skull" />}
      />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  @media (max-width: 48em) {
    justify-content: end;
  }
`;
