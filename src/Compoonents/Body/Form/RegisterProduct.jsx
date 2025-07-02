import styled from "styled-components";
import { v } from "../../../Styles/variables.jsx";
import {
  InputText,
  BtnOne,
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
  useStoragesStore,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Device } from "../../../Styles/BreakPionts.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export const RegisterProduct = ({ onClose, dataSelect, action }) => {
  const { dataCompany } = useCompanyStore();
  const { insertStorage, addStorages, dataStorages, deleteStorage } =
    useStoragesStore();
  const { branchItemSelect, dataBranch, selectBranch } = useBranchesStore();
  const { dataCategories, categoriesItemSelect, selectCategories } =
    useCategoriesStore();
  const {
    insertProduct,
    updateProduct,
    generatorCode,
    codeGenerator,
    refetchs,
  } = useProductsStore();

  const [isCheckedOne, setIsCheckedOne] = useState(true);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const [saleFor, setSaleFor] = useState("Unit");

  const [inentoryState, setInentoryState] = useState(false);
  const [showBranchList, setShowBranchList] = useState(false);
  const [showCategoriesList, setShowCategoriesList] = useState(false);
  const [enabledStockState, setEnableStockState] = useState(false);
  const [randomBarCode, setRandomBarCode] = useState("");
  const [randomBarCodeInternal, setRandomBarCodeInternal] = useState("");

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "add stock in storages",
      { id_product: dataSelect.id, id_branches: branchItemSelect.id },
    ],
    queryFn: () =>
      addStorages({
        id_branches: branchItemSelect.id,
        id_product: dataSelect.id,
      }),
    enabled: inentoryState,
  });

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
    handlerValidateData(data);

    if (action === "Update") {
      const params = {
        _id: dataSelect.id,
        _name: data.name,
        _price_sele: parseFloat(data.price_sele),
        _price_buys: parseFloat(data.price_buys),
        _id_categorys: categoriesItemSelect.id,
        _bar_code: randomBarCode ? randomBarCode : codeGenerator,
        _bar_code_internal: randomBarCodeInternal
          ? randomBarCodeInternal
          : codeGenerator,
        _id_company: dataCompany.id,
        _sold_by: saleFor,
        _manage_inventory: inentoryState,
      };
      await updateProduct(params);

      if (setInentoryState) {
        if (dataStorages == null) {
          const paramsStorages = {
            id_branches: branchItemSelect.id,
            id_product: dataSelect.id,
            stock: parseFloat(data.stock),
            min_stock: parseFloat(data.min_stock),
          };
          await insertStorage(paramsStorages);
        }
      }
    } else {
      const params = {
        _name: data.name,
        _price_sele: parseFloat(data.price_sele),
        _price_buys: parseFloat(data.price_buys),
        _id_categorys: categoriesItemSelect.id,
        _bar_code: randomBarCode ? randomBarCode : codeGenerator,
        _bar_code_internal: randomBarCodeInternal
          ? randomBarCodeInternal
          : codeGenerator,
        _id_company: dataCompany.id,
        _sold_by: saleFor,
        _manage_inventory: inentoryState,
        _manage_multi_prices: false,
      };

      const newIdProduct = await insertProduct(params);

      if (setInentoryState) {
        const paramsStorages = {
          id_branches: branchItemSelect.id,
          id_product: newIdProduct,
          stock: parseFloat(data.stock),
          min_stock: parseFloat(data.min_stock),
        };
        await insertStorage(paramsStorages);
      }
    }
  }

  const handlerValidateData = (data) => {
    if (!randomBarCodeInternal) {
      automaticGeneratorCodeInternal();
    }

    if (!randomBarCode) {
      automaticGeneratorBarCode();
    }

    if (data.price_sele.trim() === "") data.price_sele = 0;
    if (data.price_buys.trim() === "") data.price_buys = 0;

    if (inentoryState) {
      if (!dataStorages) {
        if (data.stock.trim() === "") data.stock = 0;
        if (data.min_stock.trim() === "") data.min_stock = 0;
      }
    }
  };

  const automaticGeneratorCodeInternal = () => {
    generatorCode();
    setRandomBarCodeInternal(codeGenerator);
    dataSelect.bar_code_internal = codeGenerator;
  };

  const automaticGeneratorBarCode = () => {
    generatorCode();
    setRandomBarCode(codeGenerator);
    dataSelect.bar_code = codeGenerator;
  };

  const handlerChangeBarCode = (e) => {
    setRandomBarCode(e.target.value);
  };
  const handlerChangeBarCodeInternal = (e) => {
    setRandomBarCodeInternal(e.target.value);
  };

  useEffect(() => {
    if (action != "Update") {
      automaticGeneratorCodeInternal();
    } else {
      setRandomBarCodeInternal(dataSelect.bar_code_internal);
      setRandomBarCode(dataSelect.bar_code);
      dataSelect.sold_by === "Unit"
        ? handlerCheckboxChange(1)
        : handlerCheckboxChange(0);

      dataSelect.manage_inventory
        ? setInentoryState(true)
        : setInentoryState(false);

      dataSelect.manage_inventory
        ? setEnableStockState(true)
        : setEnableStockState(false);
    }
  }, []);

  const hamdlerCheckInventory = () => {
    if (action === "Update") {
      if (dataStorages) {
        if (inentoryState) {
          Swal.fire({
            title: "¿You're sure.?",
            text: "Deactivate inventory, it will delete all the stocks",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              setInentoryState(false);
              await deleteStorage({ id: dataStorages.id });
            }
          });
        } else {
          setInentoryState(true);
        }
      } else {
        setInentoryState(!inentoryState);
      }
    } else {
      setInentoryState(!inentoryState);
    }
  };

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
              <span
                onClick={() => {
                  refetchs(), onClose();
                }}
              >
                X
              </span>
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
                    defaultValue={dataSelect.price_sele}
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
                    value={randomBarCode}
                    onChange={handlerChangeBarCode}
                    type="text"
                    placeholder="bar-code"
                    /* {...register("bar_code")} */
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
                    value={randomBarCodeInternal}
                    onChange={handlerChangeBarCodeInternal}
                    type="text"
                    placeholder="bar-code-int"
                    /* {...register("bar_code_internal")} */
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
                  setState={hamdlerCheckInventory}
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
                      refetch={refetch}
                      data={dataBranch}
                      top="4rem"
                      state={showBranchList}
                      setState={() => setShowBranchList(!showBranchList)}
                      funcion={selectBranch}
                    />
                  </ContainerSelector>
                  {enabledStockState && (
                    <ContainerMesageStock>
                      <span>
                        To modify the stock, do so from the KARDEX module.
                      </span>
                    </ContainerMesageStock>
                  )}

                  <article>
                    <InputText icono={<v.iconoflechaderecha />}>
                      <input
                        disabled={enabledStockState}
                        className="form__field"
                        defaultValue={dataStorages?.stock}
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
                        disabled={enabledStockState}
                        className="form__field"
                        defaultValue={dataStorages?.min_stock}
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
    height: calc(100vh - 20px);
    overflow-y: auto;

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
const ContainerMesageStock = styled.div`
  text-align: center;
  color: rgb(255, 1, 1);
  background-color: rgba(255, 0, 0, 0.2);
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
`;
