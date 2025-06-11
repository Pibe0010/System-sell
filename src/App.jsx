import styled, { ThemeProvider } from "styled-components";
import {
  AuthContextProvider,
  GlobalStyle,
  MyRoutes,
  Sidebar,
  useThemeStore,
  LoginPage,
} from "./index.js";
import { Device } from "./Styles/BreakPionts.jsx";
import { useState } from "react";
import { useLocation } from "react-router";

function App() {
  const [siderbarOpen, setSiderbarOpen] = useState(false);
  const { themeStyle } = useThemeStore();
  const { pathname } = useLocation();

  return (
    <ThemeProvider theme={themeStyle}>
      <AuthContextProvider>
        <GlobalStyle />
        {pathname != "/login" ? (
          <Container className={siderbarOpen ? "active" : ""}>
            <section className="contentSidebar">
              <Sidebar
                state={siderbarOpen}
                setState={() => setSiderbarOpen(!siderbarOpen)}
              />
            </section>
            <section className="contentMenuHamburger">Hamburger</section>
            <section className="contentRouters">
              <MyRoutes />
            </section>
          </Container>
        ) : (
          <LoginPage />
        )}
      </AuthContextProvider>
    </ThemeProvider>
  );
}
const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;

  .contentSidebar {
    display: none;
  }
  .contentMenuHamburger {
    position: absolute;
  }
  .contentRouters {
    grid-column: 1;
    width: 100%;
  }
  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr;
    &.active {
      grid-template-columns: 260px 1fr;
    }
    .contentSidebar {
      display: initial;
    }
    .contentMenuHamburger {
      display: none;
    }
    .contentRouters {
      grid-column: 2;
    }
  }
`;
export default App;
