import React, { useState, useEffect } from 'react';
var MouseTracker = function () {
    var _a = useState({ x: 0, y: 0 }), site = _a[0], setSite = _a[1];
    useEffect(function () {
        var updateMouse = function (e) {
            console.log('mousemove 事件');
            setSite({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('mousemove', updateMouse);
        return function () {
            document.removeEventListener('mousemove', updateMouse);
        };
    }, []);
    return ( // 做清除操作
    React.createElement("p", null,
        "X: ",
        site.x,
        ", Y: ",
        site.y));
};
export default MouseTracker;
