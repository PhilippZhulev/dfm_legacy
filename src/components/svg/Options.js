/*
* desc: Icon
* ver 1.0.0
* Copyright(c) Heavy mouse team.
*
* props:
* @width {string}
* @height {string}
* @color {string}
*/

import React from 'react';

export default function Options(props) {
    return (
        <svg
            width={props.width === undefined ? '16' : props.width}
            height={props.height === undefined ? '14' : props.height}
            viewBox="0 0 16 14"
            fill={!props.color ? '#fff' : props.color}
            style={{ ...props.style, position: 'relative' }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M2.80132 12.7676V8.28852M2.80132 5.72906V1.25M7.89215 12.7676V7.00879M7.89215 4.44933V1.25M12.983 12.7676V9.56825M12.983 7.00879V1.25M0.892151 8.28852H4.71048M5.98298 4.44933H9.80132M11.0738 9.56825H14.8922" stroke="#98A7B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}
