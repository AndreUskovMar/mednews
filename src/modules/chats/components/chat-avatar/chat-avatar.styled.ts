import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

// styles
import { wPx } from 'styles/pixel-ratio';

export const ChatContactPhoto = styled(FastImage)`
  width: ${wPx(38)}px;
  height: ${wPx(38)}px;
  border-radius: ${wPx(19)}px;
`;
