import React from 'react';
/**
 * @param  {} props
 */
export default function StarFavorited(props) {
  return (
    <svg
      data-testid='starFavorited'
      width={props.width === undefined ? '15' : props.width}
      height={props.height === undefined ? '15' : props.height}
      viewBox='0 0 12 12'
      fill={!props.color ? 'none' : props.color}
      style={{ position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6 0C6.22512 0 6.42995 0.130125 6.52561 0.33391L8.06868 3.62107L11.5075 4.14961C11.7226 4.18266 11.9011 4.33317 11.9701 4.53953C12.039 4.74589 11.9868 4.97348 11.8348 5.12916L9.32994 7.6946L9.92222 11.3259C9.95802 11.5454 9.86533 11.766 9.68353 11.8941C9.50173 12.0221 9.26277 12.0351 9.06817 11.9275L6 10.2308L2.93183 11.9275C2.73723 12.0351 2.49827 12.0221 2.31647 11.8941C2.13467 11.766 2.04198 11.5454 2.07778 11.3259L2.67006 7.6946L0.165205 5.12916C0.0132056 4.97348 -0.0390071 4.74589 0.0299346 4.53953C0.0988762 4.33317 0.277402 4.18266 0.492451 4.14961L3.93132 3.62107L5.47439 0.33391C5.57005 0.130125 5.77488 0 6 0Z'
        fill='#FFD646'
      />
    </svg>
  );
}
