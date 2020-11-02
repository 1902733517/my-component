import React from 'react';
declare type position = 'top' | 'bottom' | 'left' | 'right';
declare type tabsType = 'card' | 'line' | 'editable-card';
export interface TabsProps {
    tabsPosition?: position;
    type?: tabsType;
    activeKey?: string;
    onChange?: (index: string) => void;
    onEdit?: (index: string) => void;
}
interface ITabsContext {
    index: string;
    type?: tabsType;
    onChange?: (index: string, e: HTMLDivElement) => void;
    onEdit?: (index: string) => void;
}
export declare const TabsContext: React.Context<ITabsContext>;
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
