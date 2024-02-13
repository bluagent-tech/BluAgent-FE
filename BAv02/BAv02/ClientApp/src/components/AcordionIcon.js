import React from "react";

const AcordionIcon = (props) => {

    return (
        <svg
            style={props.style}
            height={props.height}
            // justifyContent='left'
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
            width={props.width}
            transform= {props.rotation===false? '0':'rotate(90)'}
            viewBox="0 0 384 512">
            <path
                fill={props.fill}
                d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
    )
}

export default AcordionIcon;