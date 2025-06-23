import React, { useState } from "react";
import { v } from "../../../Styles/variables.jsx";
import styled from "styled-components";
import { BtnOne } from "../../../index.js";

export const Pagination = ({ table }) => {
  return (
    <Container>
      <BtnOne
        disabled={!table.getCanPreviousPage()}
        funcion={() => table.setPageIndex(0)}
        bgcolor="#F3D20C"
        icono={<v.iconotodos />}
      />

      <BtnOne
        disabled={!table.getCanPreviousPage()}
        funcion={() => table.previousPage()}
        bgcolor="#F3D20C"
        icono={<v.iconoflechaizquierda />}
      />

      <span>{table.getState().pagination.pageIndex + 1}</span>
      <p> de {table.getPageCount()} </p>

      <BtnOne
        disabled={!table.getCanNextPage()}
        funcion={() => table.nextPage()}
        bgcolor="#F3D20C"
        icono={<v.iconoflechaderecha />}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: ${(props) => props.theme.text};
`;
