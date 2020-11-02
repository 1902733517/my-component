import { useState, useEffect } from 'react';
var useMousePosition = function () {
    var _a = useState({ x: 0, y: 0 }), site = _a[0], setSite = _a[1];
    useEffect(function () {
        var updateMouse = function (e) {
            setSite({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('click', updateMouse);
        return function () {
            document.removeEventListener('click', updateMouse);
        };
    }, []);
    return site;
};
export default useMousePosition;
