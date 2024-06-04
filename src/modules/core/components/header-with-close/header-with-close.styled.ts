import styled from 'styled-components/native';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.SafeAreaView<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor};
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: ${hPx(50)}px;
  padding-right: ${wPx(16)}px;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: ${wPx(8)}px;
  justify-content: center;
  align-items: center;
`;
