import styled from "styled-components";
import { useAuthStore } from "../../Stores/AuthStore";
import { UserAuth } from "../../Context/AuthContext";

export const HomeTemplate = () => {
  const { closeSession } = useAuthStore();
  const { user } = UserAuth();
  return (
    <Container>
      <span>HomeTemplate</span>
      <button onClick={closeSession}>logout</button>
      <span>{user.id}</span>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  color: ${({ theme }) => theme.text};
`;
