import React from 'react';
export interface TabPaneProps {
    tab?: string;
    paneKey?: string;
    disabled?: boolean;
    closable?: boolean;
}
declare const TabPane: React.FC<TabPaneProps>;
export default TabPane;
