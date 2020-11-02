import React from 'react';
import Icon from '../Icon/icon';
import Progress from '../Progerss/progress';
export var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: "wg-upload-list" }, fileList.map(function (item) {
        return (React.createElement("li", { className: "wg-upload-list-item", key: item.uid },
            React.createElement("div", { className: "list-content" },
                React.createElement(Icon, { icon: "paste", className: "file-icon file-name-" + item.status }),
                React.createElement("span", { className: "file-name file-name-" + item.status }, item.name),
                React.createElement("span", { className: "file-status" },
                    item.status == "uploading" && React.createElement(Icon, { icon: "spinner", spin: true, color: "#3385fd" }),
                    item.status == 'success' && React.createElement(Icon, { icon: "check-circle", color: "#1b926c" }),
                    item.status == 'error' && React.createElement(Icon, { icon: "times-circle", color: "#f73131" })),
                React.createElement(Icon, { className: "file-action", icon: "times", onClick: function () { onRemove(item); } })),
            item.status == 'uploading' &&
                React.createElement(Progress, { percent: item.percent || 0 })));
    })));
};
export default UploadList;
