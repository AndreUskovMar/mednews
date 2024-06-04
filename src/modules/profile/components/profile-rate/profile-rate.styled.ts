import styled from 'styled-components/native';

// utils
import { hPx, wPx } from 'styles/pixel-ratio';

export const ProfileRateWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${hPx(19)}px ${wPx(16)}px;
  margin-bottom: ${hPx(120)}px;
`;
