import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

export type IconName =
  | 'done'
  | 'back'
  | 'forward'
  | 'balance'
  | 'chain'
  | 'sharearrow'
  | 'feed'
  | 'contact'
  | 'calendar'
  | 'profile'
  | 'close'
  | 'whatsapp'
  | 'mail'
  | 'orangemail'
  | 'phone'
  | 'orangephone'
  | 'search'
  | 'leftarrow'
  | 'addprofile'
  | 'bubble'
  | 'location'
  | 'orangelocation'
  | 'orangecalendar'
  | 'orangeprofile'
  | 'orangedatabase'
  | 'database'
  | 'time'
  | 'share'
  | 'star'
  | 'wifislash'
  | 'info';

export type IconProps = {
  name: IconName;
} & SvgProps;

export type IconsMap = Record<IconName, FC<SvgProps>>;
