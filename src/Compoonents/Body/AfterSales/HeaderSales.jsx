import styled from "styled-components";
import { BtnOne, Clock, InputText2 } from "../../../index.js";
import { v } from "../../../Styles/variables.jsx";
import { Device } from "../../../Styles/BreakPionts.jsx";

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
            <span>🍱Bookkeeper</span>
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
        <article className="area-two">
          <BtnOne titulo="Reader" />
          <BtnOne titulo="Keyboard" />
        </article>
      </section>
    </Header>
  );
};

const Header = styled.div`
  grid-area: header;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 10px;
  @media ${Device.desktop} {
    border-bottom: 2px solid ${({ theme }) => theme.color2};
  }
  .content-header {
    width: 100%;
    display: grid;
    grid-template:
      "areaOne areaTwo"
      "areaThree areaThree";
    .areaOne {
      grid-area: areaOne;
    }
    .areaTwo {
      grid-area: areaTwo;
    }
    .areaThree {
      grid-area: areaThree;
    }
    @media ${Device.desktop} {
      display: flex;
      justify-content: space-between;
    }
    .content-logo {
      display: flex;
      align-items: center;
      font-weight: 700;
      img {
        width: 30px;
        object-fit: contain;
      }
    }
  }
  .search-content {
    display: grid;
    grid-template:
      "area-two area-two"
      "area-one area-one";
    gap: 10px;
    height: 100%;
    align-items: center;
    .area-one {
      grid-area: area-one;
    }
    .area-two {
      grid-area: area-two;
      display: flex;
      gap: 10px;
    }
    @media ${Device.desktop} {
      display: flex;
      gap: 10px;
      .area-one {
        width: 40vw;
      }
    }
  }
`;
const ContentUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .contentImg {
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .text-user {
    display: flex;
    flex-direction: column;
    .user {
      font-weight: 700;
    }
  }
`;
