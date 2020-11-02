import React from 'react';
export interface MenuItemProps {
    index?: string;
    className?: string;
    disabled?: Boolean;
    style?: React.CSSProperties;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
