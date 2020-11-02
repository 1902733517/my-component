import React, { useState, createContext } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ index: '0' });
var Menu = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, children = props.children, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), active = _a[0], setActive = _a[1];
    var classes = classNames('wg-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: active ? active : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildern = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child; //as 断言 断言成某种具体类型
            var displayName = childElement.type.displayName;
            if (displayName == 'MenuItem' || displayName === 'SubMenu') {
                // return child
                return React.cloneElement(childElement, { index: index.toString() }); //混入·index
            }
            else {
                console.log('Warn: Menu 不存在 MenuItem子项');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildern())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal'
};
export default Menu;
