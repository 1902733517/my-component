import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../../AppTest';
var LikeButtonLink = function () {
    var _a = useState(0), like = _a[0], setLike = _a[1];
    var _b = useState(true), on = _b[0], setOn = _b[1];
    var likeRef = useRef(0);
    var domRef = useRef(null);
    var theme = useContext(ThemeContext);
    useEffect(function () {
        document.title = "\u70B9\u51FB" + like + "\u6B21";
    }, [like]);
    useEffect(function () {
        if (domRef && domRef.current) {
            domRef.current.focus();
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { type: "text", ref: domRef }),
        React.createElement("button", { onClick: function () { setLike(on ? like + 1 : like - 1); likeRef.current++; }, style: theme },
            like,
            " \u8D5E"),
        React.createElement("button", { onClick: function () { setOn(!on); } }, on ? '赞' : '踩'),
        React.createElement("button", { onClick: function () { setTimeout(function () { alert(likeRef.current); }, 2000); } }, "\u5F39\u7A97")));
};
export default LikeButtonLink;
