import styled from 'styled-components/native';

// components
import { Typography } from 'modules/core/components/typography';

// styles
import { hPx, wPx } from 'styles/pixel-ratio';

export const Root = styled.SafeAreaView<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor};
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${hPx(50)}px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: ${wPx(8)}px;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export const Title = styled(Typography).attrs((props) => ({
  ...props,
  variant: 'h3',
}))`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  color: ${({ color }: { color: string }) => color};
  font-family: 'Mulish-Bold';
`;
