export type ScreenNamesVariant =
  | 'intro'
  | 'auth'
  | 'specialties'
  | 'countries'
  | 'news'
  | 'news-detail'
  | 'news-contact-info'
  | 'news-legal-info'
  | 'news-chat'
  | 'calendar'
  | 'calendar-detail'
  | 'contact'
  | 'contacts-search'
  | 'profile'
  | 'incoming-chat'
  | 'profile-edit';

export type ScreenNamesType = Record<ScreenNamesVariant, string>;
