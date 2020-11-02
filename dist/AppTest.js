import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './components/test/Hello';
import LikeButton from './components/test/LikeButton';
import useMousePosition from './components/test/useMousePosition';
import useURLLoader from './hooks/useURLLoader';
var themes = {
    light: {
        color: '#000',
        background: '#eee'
    },
    dark: {
        color: '#fff',
        background: '#222'
    }
};
var ThemeContext = React.createContext(themes.light);
export { ThemeContext };
function AppTest() {
    var _a = useState(true), show = _a[0], setShow = _a[1];
    var site = useMousePosition();
    var _b = useURLLoader('https://dog.ceo/api/breeds/image/random', [show]), data = _b[0], loading = _b[1];
    var dogResult = data;
    return (React.createElement("div", { className: "App" },
        React.createElement(ThemeContext.Provider, { value: themes.dark },
            React.createElement("header", { className: "App-header" },
                React.createElement("img", { src: logo, className: "App-logo", alt: "logo" }),
                React.createElement("p", null,
                    React.createElement("button", { onClick: function () { setShow(!show); } }, "\u83B7\u53D6\u56FE\u7247")),
                loading ? React.createElement("p", null, "\u52A0\u8F7D\u4E2D\u3002\u3002\u3002") : React.createElement("img", { src: dogResult && dogResult.message }),
                React.createElement(Hello, { message: 'Hello world!' }),
                React.createElement(LikeButton, null),
                React.createElement("p", null,
                    "X: ",
                    site.x,
                    ", Y: ",
                    site.y)))));
}
export default AppTest;
