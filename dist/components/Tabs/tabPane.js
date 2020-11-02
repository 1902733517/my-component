import React, { useContext, useRef } from 'react';
import classNames from 'classnames';
import { TabsContext } from './tabs';
import Icon from '../Icon/icon';
var TabPane = function (props) {
    var context = useContext(TabsContext);
    var tab = props.tab, paneKey = props.paneKey, disabled = props.disabled, closable = props.closable, children = props.children;
    var domRef = useRef(null);
    var classes = classNames('tab-pane', {
        'tab-active': paneKey === context.index,
        'tab-disabled': disabled
    });
    var handleClick = function () {
        if (context.onChange && !disabled && (typeof paneKey === 'string')) {
            context.onChange(paneKey, domRef.current);
        }
    };
    var closeClick = function () {
        if (context.onEdit && !disabled && (typeof paneKey === 'string')) {
            context.onEdit(paneKey);
        }
    };
    return (React.createElement("div", { className: classes, onClick: function () { handleClick(); }, ref: domRef },
        tab,
        context.type == 'editable-card' && !closable ?
            (React.createElement("button", { className: "tabs-tab-remove", onClick: function () { closeClick(); } },
                React.createElement(Icon, { icon: "times" }))) : ''));
};
export default TabPane;
