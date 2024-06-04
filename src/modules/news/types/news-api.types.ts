export type INewsBrand = {
  data: {
    id: number;
    attributes: {
      name: string;
      companyName: string;
      activeIngedrient: string;
      about: string;
      street: string;
      city: string;
      zipcode: string;
      country: string;
      website: string;
      hotline: string;
      locale: string;
      createdAt: string;
    };
  } | null;
};

export type INewsImage = {
  id: number;
  attributes: {
    url: string;
    width: number;
    height: number;
    mime: 'image/jpeg' | 'image/png';
    createdAt: string;
  };
};

export type INewsVideo = {
  id: number;
  attributes: {
    url: string;
    width: number;
    height: number;
    mime: 'video/mp4';
    createdAt: string;
  };
};

export type INewsSpecialization = {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    locale: string;
    name: string;
    publishedAt: string;
  };
};

export type INewsItem = {
  id: number;
  attributes: {
    title: string;
    subtitle: string;
    teaserImage: {
      data: INewsImage;
    };
    content: string;
    indication: string;
    images: {
      data: Array<INewsImage>;
    };
    videos: {
      data: Array<INewsVideo>;
    };
    isCongressPost: boolean;
    legalContent: string;
    createdAt: string;
    publishedAt: string;
    brand: INewsBrand;
    specializations?: {
      data: Array<INewsSpecialization>;
    };
  };
};

export type ListMetaResponse = {
  pagination: {
    total: number;
    page: number;
  };
};

export type GetNewsListParams = {
  pageParam?: number;
};

export type GetNewsListResponse = {
  data: Array<INewsItem>;
  meta: ListMetaResponse;
};
