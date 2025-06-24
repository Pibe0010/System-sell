import styled from "styled-components";
import { ActionsTable } from "../../../index.js";
import { v } from "../../../Styles/variables.jsx";
import { Icon } from "@iconify/react";

export function ContentActionsTable({ handlerUpdate, handlerDelete }) {
  return (
    <Container>
      <ActionsTable
        funcion={handlerUpdate}
        fontSize="18px"
        color="#7d7d7d"
        icono={<v.iconeditarTabla />}
      />
      <ActionsTable
        funcion={handlerDelete}
        fontSize="20px"
        color="#f76e6e"
        icono={<v.iconeliminarTabla />}
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
