import styled, { css } from 'styled-components/native';

// styles
import { wPx } from 'styles/pixel-ratio';

export const SpecialityButton = styled.TouchableOpacity`
  padding: ${wPx(16)}px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ selected }: { selected: boolean }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.disabled};
    `}
`;

export const IconWrapper = styled.View`
  height: ${wPx(40)}px;
  width: ${wPx(40)}px;
  border-radius: ${wPx(20)}px;
  margin-right: ${wPx(10)}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.disabled};

  ${({ selected }: { selected: boolean }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.orange};
    `}
`;
