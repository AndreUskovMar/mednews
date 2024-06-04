import { INewsImage, INewsVideo } from 'modules/news/types/news-api.types';

export type NewsImageGalleryProps = {
  gallery: Array<INewsImage | INewsVideo>;
};
