import styled from "styled-components";
import { v } from "../../../Styles/variables.jsx";
import {
  InputText,
  BtnOne,
  Transformation,
  useProductsStore,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { useCompanyStore } from "../../../Stores/CompanyStore.jsx";
import { useMutation } from "@tanstack/react-query";

export const RegisterProduct = ({ onClose, dataSelect, action }) => {
  const { insertProduct, updateProduct } = useProductsStore();
  const { dataCompany } = useCompanyStore();

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
            <section className="form-subcontainer">
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

              <BtnOne
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#0ba6f9"
              />
            </section>
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

  .sub-contenedor {
    position: relative;
    width: 500px;
    max-width: 85%;
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
      .form-subcontainer {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          color: ${({ theme }) => theme.text};
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  border: 2px dashed #f90b0b;
  border-radius: 5px;
  background-color: rgba(249, 11, 11, 0.1);
  padding: 8px;
  position: relative;
  gap: 3px;
  margin-bottom: 8px;

  .ContentImage {
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  input {
    display: none;
  }
`;
