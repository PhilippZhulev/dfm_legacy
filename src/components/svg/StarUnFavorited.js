import React from 'react';
/**
 * @param  {} props
 */
export default function StarUnFavorited(props) {
  return (
    <svg
      data-testid='starUnFavorited'
      width={props.width === undefined ? '15' : props.width}
      height={props.height === undefined ? '15' : props.height}
      viewBox='0 0 14 14'
      fill={!props.color ? 'none' : props.color}
      style={{ position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7 1L8.854 4.94953L13 5.58675L10 8.65931L10.708 13L7 10.9495L3.292 13L4 8.65931L1 5.58675L5.146 4.94953L7 1Z'
        stroke='#657D95'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
