import styled from 'styled-components/native';

// styles
import { wPx } from 'styles/pixel-ratio';

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightgray};
  padding: ${wPx(16)}px;
`;
