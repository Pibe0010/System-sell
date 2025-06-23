import styled from "styled-components";
import {
  BtnOne,
  RegisterCategories,
  Search,
  TableCategories,
  Title,
  useCategoriesStore,
} from "../../index.js";
import { v } from "../../Styles/variables.jsx";
import { useState } from "react";

export const CategoryTemplate = () => {
  const { dataCategories } = useCategoriesStore();
  const [openRegister, setOpenRegister] = useState(false);
  const [action, setAction] = useState("");
  const [dataSelect, setDataSelect] = useState({});

  const newRegister = () => {
    setOpenRegister(!openRegister);
    setAction("new");
    setDataSelect([]);
  };

  return (
    <Container>
      {openRegister && (
        <RegisterCategories
          dataSelect={dataSelect}
          action={action}
          onClose={() => setOpenRegister(!openRegister)}
        />
      )}
      <section className="area1">
        <Title>Categories</Title>
        <BtnOne
          bgcolor={v.colorPrincipal}
          titulo="New"
          icono={<v.iconoagregar />}
          funcion={newRegister}
        />
      </section>
      <section className="area2">
        <Search />
      </section>
      <section className="main">
        <TableCategories data={dataCategories} />
      </section>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 30px);
  padding: 15px;
  display: grid;
  grid-template: "area1" 60px "area2" 60px "main" auto;
  .area1 {
    grid-area: area1;
    background-color: rgba(70, 241, 70, 0.3);
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
  }
  .area2 {
    grid-area: area2;
    background-color: rgba(58, 67, 235, 0.3);
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .main {
    grid-area: main;
    background-color: rgba(235, 58, 58, 0.3);
  }
`;
