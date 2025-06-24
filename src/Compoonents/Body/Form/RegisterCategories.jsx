import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v } from "../../../Styles/variables.jsx";
import {
  InputText,
  BtnOne,
  useCategoriesStore,
  Icono,
  Transformation,
} from "../../../index.js";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import { useCompanyStore } from "../../../Stores/CompanyStore.jsx";
import { useMutation } from "@tanstack/react-query";

export const RegisterCategories = ({ onClose, dataSelect, action }) => {
  const { insertCategories, updateCategories } = useCategoriesStore();
  const { dataCompany } = useCompanyStore();
  const [currentColor, setColor] = useState("#F44336");
  const [file, setFile] = useState([]);
  const ref = useRef(null);
  const [fileurl, setFileurl] = useState();

  function elegirColor(color) {
    setColor(color.hex);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { isPending, mutate: doInsertar } = useMutation({
    mutationFn: insert,
    mutationKey: "insert category",
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
      await updateCategories(params, dataSelect.icon, file);
    } else {
      const params = {
        _name: Transformation(data.description),
        _color: currentColor,
        _icon: "-",
        _id_company: dataCompany.id,
      };

      await insertCategories(params, file);
    }
  }

  function openImages() {
    ref.current.click();
  }

  function prepararImagen(e) {
    let filelocal = e.target.files;
    let fileReaderlocal = new FileReader();
    fileReaderlocal.readAsDataURL(filelocal[0]);
    const tipoimg = e.target.files[0];
    setFile(tipoimg);
    if (fileReaderlocal && filelocal && filelocal.length) {
      fileReaderlocal.onload = function load() {
        setFileurl(fileReaderlocal.result);
      };
    }
  }

  useEffect(() => {
    if (action === "Update") {
      setColor(dataSelect.color);
      setFileurl(dataSelect.icono);
    }
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
                  ? "Updated categorie"
                  : "Register new categorie"}
              </h1>
            </section>

            <section>
              <span onClick={onClose}>X</span>
            </section>
          </div>
          <PictureContainer>
            {fileurl != "-" ? (
              <div className="ContentImage">
                <img src={fileurl}></img>
              </div>
            ) : (
              <Icono>{<v.iconoimagenvacia />}</Icono>
            )}

            <BtnOne
              funcion={openImages}
              titulo="+imagen(opcional)"
              color="#5f5f5f"
              bgcolor="rgb(183, 183, 182)"
              icono={<v.iconosupabase />}
            />
            <input
              type="file"
              ref={ref}
              onChange={(e) => prepararImagen(e)}
            ></input>
          </PictureContainer>
          <form className="formulario" onSubmit={handleSubmit(handleSub)}>
            <section className="form-subcontainer">
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.name}
                    type="text"
                    placeholder="categorie"
                    {...register("description", {
                      required: true,
                    })}
                  />
                  <label className="form__label">categorie</label>
                  {errors.description?.type === "required" && (
                    <p>Required field</p>
                  )}
                </InputText>
              </article>

              <article className="colorContainer">
                <ContentTitle>
                  {<v.paletacolores />}
                  <span>Color</span>
                </ContentTitle>
                <div className="colorPickerContent">
                  <CirclePicker onChange={elegirColor} color={currentColor} />
                </div>
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
