import React, { useState, createContext } from 'react';
import classNames from 'classnames';
export var TabsContext = createContext({ index: '0' });
var Tabs = function (props) {
    var _a;
    var type = props.type, tabsPosition = props.tabsPosition, children = props.children, activeKey = props.activeKey, onChange = props.onChange, onEdit = props.onEdit;
    console.log(children);
    var classes = classNames('wg-tabs', (_a = {},
        _a["tabs-" + tabsPosition] = tabsPosition,
        _a["tabs-" + type] = type,
        _a));
    var _b = useState(activeKey), active = _b[0], setActive = _b[1];
    var _c = useState({ width: '50px', left: '0px' }), site = _c[0], setSite = _c[1];
    var handleClick = function (index, e) {
        setActive(index);
        setSite({ width: (e ? e.offsetWidth : 0 + 'px'), left: (e ? e.offsetLeft : 0 + 'px') });
        if (onChange) {
            onChange(e.current);
        }
    };
    var editClick = function (index) {
        if (onEdit) {
            onEdit(index);
        }
    };
    var passContext = {
        index: active ? active : '0',
        type: type,
        onChange: handleClick,
        onEdit: editClick,
    };
    return (React.createElement("div", { className: classes },
        React.createElement("div", { className: "tabs-title" },
            React.createElement(TabsContext.Provider, { value: passContext },
                children,
                React.createElement("div", { className: "tabs-ink-bar", style: site }))),
        React.createElement("div", { className: "tabs-content" })));
};
Tabs.defaultProps = {
    tabsPosition: 'top',
    type: 'line'
};
export default Tabs;
