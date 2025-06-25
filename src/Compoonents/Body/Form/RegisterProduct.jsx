import styled from "styled-components";
import { v } from "../../../Styles/variables.jsx";
import {
  InputText,
  BtnOne,
  Transformation,
  useProductsStore,
  ContainerSelector,
  SwitchOne,
  Selector,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { useCompanyStore } from "../../../Stores/CompanyStore.jsx";
import { useMutation } from "@tanstack/react-query";
import { Device } from "../../../Styles/BreakPionts.jsx";
import { useState } from "react";

export const RegisterProduct = ({ onClose, dataSelect, action }) => {
  const { insertProduct, updateProduct } = useProductsStore();
  const { dataCompany } = useCompanyStore();
  const [inentoryState, setInentoryState] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isPending, mutate: doInsertar } = useMutation({
    mutationFn: insert,
    mutationKey: "insert product",
    onError: (err) => console.log("El error", err.message),
    onSuccess: () => closeForm(),
  });

  const handleSub = (data) => {
    doInsertar(data);
  };

  const closeForm = () => {
    onClose();
  };

  async function insert(data) {
    if (action === "Update") {
      const params = {
        _name: Transformation(data.description),
        _id_company: dataCompany.id,
        _color: currentColor,
        _id: dataSelect.id,
      };
      await updateProduct(params, dataSelect.icon, file);
    } else {
      const params = {
        _name: Transformation(data.description),
        _color: currentColor,
        _icon: "-",
        _id_company: dataCompany.id,
      };

      await insertProduct(params, file);
    }
  }

  return (
    <Container>
      {isPending ? (
        <span>...🔼</span>
      ) : (
        <div className="sub-contenedor">
          <div className="headers">
            <section>
              <h1>
                {action == "Update"
                  ? "Updated product"
                  : "Register new product"}
              </h1>
            </section>

            <section>
              <span onClick={onClose}>X</span>
            </section>
          </div>

          <form className="formulario" onSubmit={handleSubmit(handleSub)}>
            <section className="section_one">
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.name}
                    type="text"
                    placeholder="name"
                    {...register("name", {
                      required: true,
                    })}
                  />
                  <label className="form__label">name</label>
                  {errors.description?.type === "required" && (
                    <p>Required field</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.price_sale}
                    type="number"
                    step="0.01"
                    placeholder="price-sale"
                    {...register("price_sale", {
                      required: true,
                    })}
                  />
                  <label className="form__label">price-sale</label>
                  {errors.description?.type === "required" && (
                    <p>Required field</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.price_buys}
                    type="number"
                    step="0.01"
                    placeholder="price-buys"
                    {...register("price_buys", {
                      required: true,
                    })}
                  />
                  <label className="form__label">price-buys</label>
                  {errors.description?.type === "required" && (
                    <p>Required field</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.bar_code}
                    type="text"
                    placeholder="bar-code"
                    {...register("bar_code", {
                      required: true,
                    })}
                  />
                  <label className="form__label">bar-code</label>
                  {errors.description?.type === "required" && (
                    <p>Required field</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.bar_code_internal}
                    type="text"
                    placeholder="bar-code-int"
                    {...register("bar_code_internal", {
                      required: true,
                    })}
                  />
                  <label className="form__label">bar-code-int</label>
                  {errors.description?.type === "required" && (
                    <p>Required field</p>
                  )}
                </InputText>
              </article>
            </section>
            <section className="section_two">
              <ContainerSelector>
                <label>Control stock</label>
                <SwitchOne
                  state={inentoryState}
                  setState={() => setInentoryState(!inentoryState)}
                />
              </ContainerSelector>
              {inentoryState && (
                <ContainerStock>
                  <ContainerSelector>
                    <label>branches:</label>
                    <Selector color="#1a58eb" textOne="🖥️" />
                  </ContainerSelector>
                  <article>
                    <InputText icono={<v.iconoflechaderecha />}>
                      <input
                        className="form__field"
                        defaultValue={dataSelect.stock}
                        type="number"
                        step="0.01"
                        placeholder="stock"
                        {...register("tock", {
                          required: true,
                        })}
                      />
                      <label className="form__label">stock</label>
                      {errors.description?.type === "required" && (
                        <p>Required field</p>
                      )}
                    </InputText>
                  </article>
                  <article>
                    <InputText icono={<v.iconoflechaderecha />}>
                      <input
                        className="form__field"
                        defaultValue={dataSelect.min_stock}
                        type="number"
                        step="0.01"
                        placeholder="min-stock"
                        {...register("min_stock", {
                          required: true,
                        })}
                      />
                      <label className="form__label">min-stock</label>
                      {errors.description?.type === "required" && (
                        <p>Required field</p>
                      )}
                    </InputText>
                  </article>
                </ContainerStock>
              )}
            </section>

            <BtnOne
              icono={<v.iconoguardar />}
              titulo="Guardar"
              bgcolor="#0ba6f9"
            />
          </form>
        </div>
      )}
    </Container>
  );
};
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: ${({ theme }) => theme.text};

  .sub-contenedor {
    position: relative;
    width: 100%;
    max-width: 90%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
        color: ${({ theme }) => theme.text};
      }
      span {
        font-size: 20px;
        cursor: pointer;
        color: ${({ theme }) => theme.text};
      }
    }
    .formulario {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      @media ${Device.tablet} {
        grid-template-columns: repeat(2, 1fr);
      }
      section {
        display: flex;
        gap: 20px;
        flex-direction: column;
      }
    }
  }
`;

const ContainerStock = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(11, 178, 249, 0.9);
  border-radius: 15px;
  padding: 12px;
`;
