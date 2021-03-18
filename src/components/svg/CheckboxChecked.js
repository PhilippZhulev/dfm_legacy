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

export default function CheckboxChecked(props) {
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
            <path fillRule="evenodd" clipRule="evenodd" d="M4 0C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0H4ZM12.3406 4.84739C11.955 4.39479 11.2621 4.37655 10.8533 4.80823L7.05045 8.82358L5.14491 6.78896C4.74285 6.35966 4.05892 6.36838 3.66795 6.8078L3.62072 6.86088C3.27124 7.25365 3.28558 7.84996 3.65353 8.22548L6.33624 10.9634C6.72832 11.3636 7.3726 11.3636 7.76472 10.9635L12.3603 6.2742C12.7225 5.90461 12.7429 5.31973 12.4074 4.92579L12.3406 4.84739Z" fill="#6B75CA"/>
        </svg>
    );
}
