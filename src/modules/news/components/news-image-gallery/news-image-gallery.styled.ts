import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

// styles
import { hPx, wPx, height } from 'styles/pixel-ratio';

export const GalleryModalWrapper = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const GalleryView = styled.View`
  width: 100%;
  height: ${hPx(220)}px;
  padding-vertical: ${wPx(8)}px;
  background-color: ${({ theme }) => theme.colors.black};
  position: absolute;
  z-index: 20;
  margin-top: ${0.35 * height}px;
`;

export const GalleryItemWrapper = styled.View<{ aspectRatio: number }>`
  width: ${({ aspectRatio }) => aspectRatio * 200}px;
  height: ${hPx(200)}px;
  margin: auto;
`;

export const styles = StyleSheet.create({
  flatListItem: {
    width: wPx(88),
    height: wPx(87),
    borderRadius: wPx(8),
    marginRight: wPx(8),
  },
  swiperItem: {
    width: '100%',
    height: '100%',
  },
});
