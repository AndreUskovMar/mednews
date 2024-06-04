import { hPx } from 'styles/pixel-ratio';
import {
  ITab,
  TabProps,
} from 'modules/core/components/bottom-tab-bar/bottom-tab-bar.interface';
import { IconName } from 'modules/core/components/icon/icon.interface';

const ICON_DEFAULT_SIZE = 70;

export const tabsMap: TabProps = {
  feed: {
    title: 'Feed',
    iconProps: {
      name: 'feed',
      width: hPx(ICON_DEFAULT_SIZE),
      height: hPx(ICON_DEFAULT_SIZE),
    },
  },
  calendar: {
    title: 'Kalender',
    iconProps: {
      name: 'calendar',
      width: hPx(ICON_DEFAULT_SIZE),
      height: hPx(ICON_DEFAULT_SIZE),
    },
  },
  contact: {
    title: 'Kontakt',
    iconProps: {
      name: 'contact',
      width: hPx(ICON_DEFAULT_SIZE),
      height: hPx(ICON_DEFAULT_SIZE),
    },
  },
  profile: {
    title: 'Profil',
    iconProps: {
      name: 'profile',
      width: hPx(ICON_DEFAULT_SIZE),
      height: hPx(ICON_DEFAULT_SIZE),
    },
  },
};

export const getTab = (tabName: IconName): ITab => ({
  title: tabName[0].toUpperCase() + tabName.slice(1),
  iconProps: {
    name: tabName,
    width: hPx(ICON_DEFAULT_SIZE),
    height: hPx(ICON_DEFAULT_SIZE),
  },
});
