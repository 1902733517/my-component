import { useEffect, useState } from 'react';
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(''), debounceValue = _a[0], setDebounceValue = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebounceValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debounceValue;
}
export default useDebounce;
