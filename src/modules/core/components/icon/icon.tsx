import React, { memo } from 'react';
import { IconsMap, IconProps } from './icon.interface';
import Done from 'assets/svg/done.svg';
import Back from 'assets/svg/back.svg';
import Contact from 'assets/svg/contact.svg';
import Calendar from 'assets/svg/calendar.svg';
import Profile from 'assets/svg/profile.svg';
import AddProfile from 'assets/svg/profile-add.svg';
import Feed from 'assets/svg/feed.svg';
import Forward from 'assets/svg/forward.svg';
import Balance from 'assets/svg/balance.svg';
import Chain from 'assets/svg/chain.svg';
import ShareArrow from 'assets/svg/share-arrow.svg';
import Close from 'assets/svg/close.svg';
import Whatsapp from 'assets/svg/whatsapp.svg';
import Mail from 'assets/svg/mail.svg';
import OrangeMail from 'assets/svg/orange-mail.svg';
import Phone from 'assets/svg/phone.svg';
import OrangePhone from 'assets/svg/orange-phone.svg';
import Search from 'assets/svg/search.svg';
import LeftArrow from 'assets/svg/left-arrow.svg';
import Bubble from 'assets/svg/bubble.svg';
import OrangeLocation from 'assets/svg/orange-location.svg';
import Location from 'assets/svg/location.svg';
import Time from 'assets/svg/time.svg';
import OrangeCalendar from 'assets/svg/orange-calendar.svg';
import OrangeProfile from 'assets/svg/orange-profile.svg';
import OrangeDatabase from 'assets/svg/orange-database.svg';
import Database from 'assets/svg/database.svg';
import Share from 'assets/svg/share.svg';
import Star from 'assets/svg/star.svg';
import WifiSlash from 'assets/svg/wifi-slash.svg';
import Info from 'assets/svg/info.svg';

export const icons: IconsMap = {
  done: Done,
  back: Back,
  forward: Forward,
  balance: Balance,
  chain: Chain,
  sharearrow: ShareArrow,
  close: Close,
  whatsapp: Whatsapp,
  mail: Mail,
  orangemail: OrangeMail,
  phone: Phone,
  orangephone: OrangePhone,
  feed: Feed,
  contact: Contact,
  calendar: Calendar,
  profile: Profile,
  search: Search,
  leftarrow: LeftArrow,
  addprofile: AddProfile,
  bubble: Bubble,
  orangelocation: OrangeLocation,
  location: Location,
  time: Time,
  orangecalendar: OrangeCalendar,
  orangeprofile: OrangeProfile,
  orangedatabase: OrangeDatabase,
  database: Database,
  share: Share,
  star: Star,
  wifislash: WifiSlash,
  info: Info,
};

const Icon: React.FC<IconProps> = memo(({ name, ...props }) => {
  const SVGIcon = icons[name];

  if (!SVGIcon) {
    return null;
  }

  return <SVGIcon {...props} />;
});

export { Icon };
