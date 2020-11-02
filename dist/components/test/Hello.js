import React from 'react';
// const Hello = (props: IHelloProps) => {
//     return <h2>{props.message}</h2>
// }
// const Hello: React.FunctionComponent<IHelloProps> = (props) => {
//     return <h2>{props.message}</h2>
// }
var Hello = function (props) {
    return React.createElement("h2", null, props.message);
};
Hello.defaultProps = {
    message: 'Hello World'
};
export default Hello;
