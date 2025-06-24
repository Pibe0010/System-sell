import styled from "styled-components";
import {
  BtnOne,
  RegisterProduct,
  Search,
  TableProducts,
  Title,
  useProductsStore,
} from "../../index.js";
import { v } from "../../Styles/variables.jsx";
import { useState } from "react";

export const ProductTemplate = () => {
  const { dataProduct, setSearch } = useProductsStore();
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
        <RegisterProduct
          dataSelect={dataSelect}
          action={action}
          onClose={() => setOpenRegister(!openRegister)}
        />
      )}
      <section className="area1">
        <Title>Product</Title>
        <BtnOne
          bgcolor={v.colorPrincipal}
          titulo="New"
          icono={<v.iconoagregar />}
          funcion={newRegister}
        />
      </section>
      <section className="area2">
        <Search setSearch={setSearch} />
      </section>
      <section className="main">
        <TableProducts
          data={dataProduct}
          setOpenRegister={setOpenRegister}
          setAccion={setAction}
          setDataSelect={setDataSelect}
        />
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
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
  }
  .area2 {
    grid-area: area2;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .main {
    grid-area: main;
  }
`;
