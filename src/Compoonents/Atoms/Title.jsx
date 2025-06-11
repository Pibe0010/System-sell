import styled from "styled-components";

export const Title = styled.span`
  font-weight: 700;
  font-size: 30px;
  color: ${(props) => props.theme.text};
  padding-bottom: ${(props) => props.$paddingbotton};
`;
