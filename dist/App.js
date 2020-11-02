import React, { useState } from 'react';
import './styles/index.scss';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Transition from './components/Transition/transition';
import Tabs from './components/Tabs/tabs';
import TabPane from './components/Tabs/tabPane';
import { Input } from './components/Input/input';
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    var _b = useState([
        { name: '标签1' },
        { name: '标签2' },
        { name: '标签3', closePane: true },
        { name: '标签4' },
        { name: '标签5' },
    ]), list = _b[0], setList = _b[1];
    var closePane = function (index) {
        var arr = list.slice();
        arr.splice(Number(index), 1);
        setList(arr);
    };
    return (React.createElement("div", { className: "App" },
        React.createElement(Button, null, "Button "),
        React.createElement(Button, { disabled: true }, "disabled Button"),
        React.createElement(Button, { btnType: 'danger', size: 'sm' }, "Small Danger "),
        React.createElement(Button, { btnType: 'primary', size: 'sm', disabled: true }, "disabled Danger "),
        React.createElement(Button, { btnType: 'primary', size: 'lg' }, "Large Danger "),
        React.createElement(Button, { btnType: 'link', href: "www.baidu.com" }, "Link"),
        React.createElement(Button, { btnType: 'link', href: "www.baidu.com", disabled: true }, "disabled Link"),
        React.createElement(Menu, { onSelect: function (index) { alert(index); } },
            React.createElement(MenuItem, null, "cool link"),
            React.createElement(MenuItem, { disabled: true }, "cool link 2"),
            React.createElement(MenuItem, null, "cool link 3"),
            React.createElement(SubMenu, { title: "dropdown" },
                React.createElement(MenuItem, null, "drop1"),
                React.createElement(MenuItem, null, "dropdown 2"),
                React.createElement(MenuItem, null, "dropdown 3"))),
        React.createElement(Button, { onClick: function () { setShow(!show); } }, "Button "),
        React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-right" },
            React.createElement("div", null,
                React.createElement("p", null, "EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD"),
                React.createElement("p", null, "EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD"),
                React.createElement("p", null, "EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD"),
                React.createElement("p", null, "EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD"),
                React.createElement("p", null, "EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD"),
                React.createElement("p", null, "EDIT DRC/APP.VUE ANF SEAVR DI TO KSDSB WWDSD"))),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(Tabs, { activeKey: "0", type: "editable-card", onEdit: closePane }, list.map(function (item, index) {
            return (React.createElement(TabPane, { tab: item.name, paneKey: index.toString(), closable: item.closePane, key: index },
                React.createElement("h1", null,
                    "\u8FD9\u662Fh1\u6807\u7B7E",
                    React.createElement("b", null, "999"))));
        })),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("div", { style: { marginLeft: '15px', } },
            React.createElement(Input, { icon: "search", placeholder: "placeholder" }),
            React.createElement("br", null),
            React.createElement(Input, { disabled: true, placeholder: "placeholder" }),
            React.createElement("br", null),
            React.createElement(Input, { append: ".com", placeholder: "placeholder" }),
            React.createElement("br", null),
            React.createElement(Input, { prepand: "https:", placeholder: "placeholder" }),
            React.createElement("br", null),
            React.createElement(Input, { prepand: "https:", append: ".com", placeholder: "placeholder" }))));
}
export default App;
