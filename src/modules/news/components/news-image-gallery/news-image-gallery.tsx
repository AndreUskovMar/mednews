import React, { FC, useCallback, useState } from 'react';
import { Modal, Pressable, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import Config from 'react-native-config';

// components
import {
  GalleryModalWrapper,
  GalleryItemWrapper,
  GalleryView,
} from './news-image-gallery.styled';

// utils
import { getStrapiUrlImage } from 'modules/core/utils';

// styles
import { styles } from './news-image-gallery.styled';

import { NewsImageGalleryProps } from './news-image-gallery.interface';

export const NewsImageGallery: FC<NewsImageGalleryProps> = ({ gallery }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageNumber, setImageNumber] = useState(0);

  const closeModal = useCallback(() => setModalVisible(false), []);

  const openModal = useCallback((index) => {
    setImageNumber(index);
    setModalVisible(true);
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => (
      <Pressable onPress={() => openModal(index)}>
        {item.attributes.mime.startsWith('image') ? (
          <FastImage
            source={{
              uri: getStrapiUrlImage(item.attributes.url),
            }}
            style={styles.flatListItem}
          />
        ) : (
          <Video
            resizeMode={'cover'}
            volume={0}
            source={{
              uri: getStrapiUrlImage(item.attributes.url),
            }}
            poster={Config.POSTER_URL}
            posterResizeMode={'cover'}
            paused
            style={styles.flatListItem}
          />
        )}
      </Pressable>
    ),
    [openModal]
  );

  return (
    <>
      <Modal
        animationType={'fade'}
        visible={modalVisible}
        statusBarTranslucent
        transparent
        onRequestClose={closeModal}
      >
        <GalleryView>
          <Swiper
            index={imageNumber}
            autoplay={false}
            showsPagination={false}
            onIndexChanged={setImageNumber}
            loop={false}
          >
            {gallery.map((item, index) => (
              <React.Fragment key={item.id + item.attributes.mime}>
                {item.attributes.mime.startsWith('image') ? (
                  <GalleryItemWrapper
                    aspectRatio={item.attributes.width / item.attributes.height}
                  >
                    <FastImage
                      source={{
                        uri: getStrapiUrlImage(item.attributes.url),
                      }}
                      style={styles.swiperItem}
                    />
                  </GalleryItemWrapper>
                ) : (
                  <GalleryItemWrapper aspectRatio={1.5}>
                    <Video
                      resizeMode={'cover'}
                      volume={Number(imageNumber === index)}
                      paused={imageNumber !== index}
                      source={{
                        uri: getStrapiUrlImage(item.attributes.url),
                      }}
                      poster={Config.POSTER_URL}
                      posterResizeMode={'cover'}
                      style={styles.swiperItem}
                      repeat
                    />
                  </GalleryItemWrapper>
                )}
              </React.Fragment>
            ))}
          </Swiper>
        </GalleryView>
        <GalleryModalWrapper onPress={closeModal} />
      </Modal>

      <FlatList
        data={gallery}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + item.attributes.mime}
        horizontal
      />
    </>
  );
};
