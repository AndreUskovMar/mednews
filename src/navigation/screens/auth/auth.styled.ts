import styled from 'styled-components/native';

export const ContentWrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 20;
  background-color: ${({ theme }) => theme.colors.white};
`;
