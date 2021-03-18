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

export default function Checkbox(props) {
    return (
        <svg
            width={props.width === undefined ? '16' : props.width}
            height={props.height === undefined ? '16' : props.height}
            viewBox="0 0 16 16"
            fill={!props.color ? 'white' : props.color}
            style={{ ...props.style, position: 'relative' }}
            xmlns="http://www.w3.org/2000/svg"
            className={'locked'}
        >
            <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#657D95"/>
        </svg>
    );
}
