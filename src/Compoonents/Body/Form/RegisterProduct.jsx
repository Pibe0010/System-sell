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
  useBranchesStore,
  DropDawnList,
  useCategoriesStore,
  CheckboxOne,
  BtnTwo,
  useCompanyStore,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Device } from "../../../Styles/BreakPionts.jsx";
import { useState, useEffect } from "react";

export const RegisterProduct = ({ onClose, dataSelect, action }) => {
  const { dataCompany } = useCompanyStore();
  const { branchItemSelect, dataBranch, selectBranch } = useBranchesStore();
  const { dataCategories, categoriesItemSelect, selectCategories } =
    useCategoriesStore();
  const { insertProduct, updateProduct, generatorCode, codeGenerator } =
    useProductsStore();

  const [isCheckedOne, setIsCheckedOne] = useState(true);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const [saleFor, setSaleFor] = useState("Unit");

  const [inentoryState, setInentoryState] = useState(false);
  const [showBranchList, setShowBranchList] = useState(false);
  const [showCategoriesList, setShowCategoriesList] = useState(false);

  const handlerCheckboxChange = (checkboxNumber) => {
    if (checkboxNumber === 1) {
      setIsCheckedOne(true);
      setIsCheckedTwo(false);
      setSaleFor("Unit");
    } else {
      setIsCheckedOne(false);
      setIsCheckedTwo(true);
      setSaleFor("Bulk");
    }
  };

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
    console.log("data insert", data);
    handlerValidateData(data);

    if (action === "Update") {
      const params = {
        _name: Transformation(data.description),
        _id_company: dataCompany.id,
        _color: currentColor,
        _id: dataSelect.id,
      };
      await updateProduct(params, dataSelect.icon);
    } else {
      const params = {
        _name: data.name,
        _price_sele: parseFloat(data.price_sele),
        _price_buys: parseFloat(data.price_buys),
        _id_categorys: categoriesItemSelect.id,
        _bar_code: data.bar_code,
        _bar_code_internal: data.bar_code_internal,
        _id_company: dataCompany.id,
        _sold_by: saleFor,
        _manage_inventory: inentoryState,
        _manage_multi_prices: false,
      };
      console.log(params);

      await insertProduct(params);
    }
  }

  const handlerValidateData = (data) => {
    if (data.bar_code_internal.trim() === "") {
      automaticGeneratorCodeInternal();
      data.bar_code_internal = dataSelect.bar_code_internal;
    }

    if (data.bar_code.trim() === "") {
      automaticGeneratorBarCode();
      data.bar_code = dataSelect.bar_code;
    }
    if (data.price_sele.trim() === "") data.price_sele = 0;
    if (data.price_buys.trim() === "") data.price_buys = 0;
  };

  const automaticGeneratorCodeInternal = () => {
    generatorCode();
    dataSelect.bar_code_internal = codeGenerator;
  };

  const automaticGeneratorBarCode = () => {
    generatorCode();
    dataSelect.bar_code = codeGenerator;
  };

  useEffect(() => {
    if (action != "Update") automaticGeneratorCodeInternal();
  }, []);

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
                  {errors.name?.type === "required" && <p>Required field</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.price_selee}
                    type="number"
                    step="0.01"
                    placeholder="price-sele"
                    {...register("price_sele")}
                  />
                  <label className="form__label">price-sele</label>
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
                    {...register("price_buys")}
                  />
                  <label className="form__label">price-buys</label>
                </InputText>
              </article>
              <article className="contentFatherGenerator">
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.bar_code}
                    type="text"
                    placeholder="bar-code"
                    {...register("bar_code")}
                  />
                  <label className="form__label">bar-code</label>
                </InputText>
                <ContainerBtn>
                  <BtnTwo
                    titulo="Generate"
                    funcion={automaticGeneratorBarCode}
                  />
                </ContainerBtn>
              </article>
              <article className="contentFatherGenerator">
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.bar_code_internal}
                    type="text"
                    placeholder="bar-code-int"
                    {...register("bar_code_internal")}
                  />
                  <label className="form__label">bar-code-int</label>
                </InputText>
                <ContainerBtn>
                  <BtnTwo
                    titulo="Generate"
                    funcion={automaticGeneratorCodeInternal}
                  />
                </ContainerBtn>
              </article>
            </section>
            <section className="section_two">
              <label>Sele for: </label>
              <ContainerSelector>
                <label>Unit: </label>
                <CheckboxOne
                  isChecked={isCheckedOne}
                  onChange={() => handlerCheckboxChange(1)}
                />
                <label>Bulk(decimals): </label>
                <CheckboxOne
                  isChecked={isCheckedTwo}
                  onChange={() => handlerCheckboxChange(2)}
                />
              </ContainerSelector>
              <ContainerSelector>
                <label>Categories: </label>
                <Selector
                  color="#1a58eb"
                  textOne="🖥️ "
                  textTwo={categoriesItemSelect?.name}
                  funcion={() => setShowCategoriesList(!showCategoriesList)}
                  state={showCategoriesList}
                />
                <DropDawnList
                  data={dataCategories}
                  top="4rem"
                  state={showCategoriesList}
                  setState={() => setShowCategoriesList(!showCategoriesList)}
                  funcion={selectCategories}
                />
              </ContainerSelector>
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
                    <label>Branches: </label>
                    <Selector
                      color="#1a58eb"
                      textOne="🖥️ "
                      textTwo={branchItemSelect?.name}
                      funcion={() => setShowBranchList(!showBranchList)}
                      state={showBranchList}
                    />
                    <DropDawnList
                      data={dataBranch}
                      top="4rem"
                      state={showBranchList}
                      setState={() => setShowBranchList(!showBranchList)}
                      funcion={selectBranch}
                    />
                  </ContainerSelector>
                  <article>
                    <InputText icono={<v.iconoflechaderecha />}>
                      <input
                        className="form__field"
                        defaultValue={dataSelect.stock}
                        type="number"
                        step="0.01"
                        placeholder="stock"
                        {...register("stock")}
                      />
                      <label className="form__label">stock</label>
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
                        {...register("min_stock")}
                      />
                      <label className="form__label">min-stock</label>
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
      .section_one,
      .section_two {
        display: flex;
        gap: 20px;
        flex-direction: column;
      }
      .contentFatherGenerator {
        position: relative;
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

const ContainerBtn = styled.div`
  position: absolute;
  right: 0;
  top: 10%;
`;
