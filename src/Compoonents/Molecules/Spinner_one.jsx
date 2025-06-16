import styled from "styled-components";
import { RingLoader } from "react-spinners";

export const Spinner_one = () => {
  return (
    <Container>
      <RingLoader color="#7f3ceb" size={80} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
