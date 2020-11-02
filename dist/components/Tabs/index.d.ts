import { TabsProps } from './tabs';
import { TabPaneProps } from './tabPane';
import { FC } from 'react';
export declare type ITabsComponent = FC<TabsProps> & {
    Item: FC<TabPaneProps>;
};
declare const TransTabs: ITabsComponent;
export default TransTabs;
