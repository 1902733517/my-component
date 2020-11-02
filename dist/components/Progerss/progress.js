import React from 'react';
var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: "wg-progress-bar", style: styles },
        React.createElement("div", { className: "wg-progress-bar-outer", style: { height: strokeHeight + "px" } },
            React.createElement("div", { className: "wg-progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: "inner-text" },
                percent,
                "%")))));
};
Progress.defaultProps = {
    strokeHeight: 11,
    theme: 'primary',
    showText: true
};
export default Progress;
