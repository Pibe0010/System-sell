import styled from "styled-components";
import {
  Btnsave,
  Footer,
  InputText2,
  Line,
  Title,
  useAuthStore,
} from "../../index";
import { v } from "../../Styles/variables";
import { Device } from "../../Styles/BreakPionts.jsx";

export const LoginTemplate = () => {
  const { loginGoogle } = useAuthStore();
  return (
    <Container>
      <div className="card">
        <Title $paddingbotton="20px">Login</Title>
        <form action="">
          <InputText2>
            <input className="form__field" type="email" placeholder="E-mail" />
          </InputText2>
          <InputText2>
            <input
              className="form__field"
              type="password"
              placeholder="Password"
            />
          </InputText2>
          <Btnsave
            titulo="Singup"
            bgcolor="#1CB0F6"
            color="255, 255, 255"
            width="100%"
          />
        </form>
        <Line>
          <span>O</span>
        </Line>
        <Btnsave
          titulo="Google"
          bgcolor="#fff"
          icono={<v.iconogoogle />}
          width="100%"
          funcion={loginGoogle}
        />
      </div>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: 20px;
    @media ${Device.tablet} {
      width: 400px;
    }
  }
`;
