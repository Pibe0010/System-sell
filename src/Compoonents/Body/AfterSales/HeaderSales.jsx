import styled from "styled-components";
import { BtnOne, Clock, InputText2 } from "../../../index.js";
import { v } from "../../../Styles/variables.jsx";

export const HeaderSales = () => {
  return (
    <Header>
      <section className="content-header">
        <ContentUser className="areaOne">
          <div className="contentImg">
            <img
              src="https://img.icons8.com/ios/50/000000/user-male-circle.png"
              alt="User"
            />
          </div>
          <div className="text-user">
            <span className="user">Carlos</span>
            <span>Bookkeeper</span>
          </div>
        </ContentUser>
        <article className="content-logo areaTwo">
          <img src={v.logo} className="logo" alt="Logo" />
          <span>System Sell</span>
        </article>
        <article className="content-logo areaThree">
          <Clock />
        </article>
      </section>
      <section className="search-content">
        <article className="area-one">
          <InputText2>
            <input className="form__field" type="text" placeholder="Search" />
          </InputText2>
        </article>
        <article>
          <BtnOne titulo="Reader" />
          <BtnOne titulo="Keyboard" />
        </article>
      </section>
    </Header>
  );
};

const Header = styled.div`
  grid-area: header;
  background-color: rgba(21, 248, 5, 0.5);
`;
const ContentUser = styled.div``;
