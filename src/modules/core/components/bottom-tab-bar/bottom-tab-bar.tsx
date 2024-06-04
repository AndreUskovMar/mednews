import React, { FC } from 'react';
import { useTheme } from 'styled-components';

// components
import {
  Root,
  Tab,
  TabContent,
  TabIcon,
  TabName,
} from './bottom-tab-bar.styled';

// constants
import { tabsMap, getTab } from 'modules/core/constants/tabs';

import { IconName } from 'modules/core/components/icon/icon.interface';
import type { TabBarProps } from './bottom-tab-bar.interface';

export const BottomTabBar: FC<TabBarProps> = ({
  state,
  navigation,
  isVisible,
}) => {
  const theme = useTheme();
  const activeTabKey = state.history[state.history.length - 1].key;

  return (
    <Root isVisible={isVisible}>
      {state.routes.map((route) => {
        const tab = tabsMap[route.name] || getTab(route.name as IconName);
        return (
          <Tab
            key={route.key}
            isActive={activeTabKey === route.key}
            onPress={() => navigation.navigate(route)}
          >
            <TabContent>
              <TabIcon
                {...tab.iconProps}
                color={
                  activeTabKey === route.key
                    ? theme.colors.orange
                    : theme.colors.grey
                }
              />
              <TabName isActive={activeTabKey === route.key}>
                {tab.title}
              </TabName>
            </TabContent>
          </Tab>
        );
      })}
    </Root>
  );
};
