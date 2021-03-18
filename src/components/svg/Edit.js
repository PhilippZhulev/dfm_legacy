import React from 'react';
/**
 * Иконка редактирования
 * @param  {Object} props
 */
export default function Edit(props) {
  return (
    <svg
      width={props.width === undefined ? '20' : props.width}
      height={props.height === undefined ? '20' : props.height}
      viewBox='0 0 20 20'
      style={{ ...props.style, position: 'relative' }}
      stroke={!props.color ? '#657D95' : props.color}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fill='none'
        d='M9.05116 2.89768H2.78915C2.31464 2.89768 1.85956 3.08618 1.52403 3.42171C1.1885 3.75724 1 4.21231 1 4.68682V17.2109C1 17.6854 1.1885 18.1404 1.52403 18.476C1.85956 18.8115 2.31464 19 2.78915 19H15.3132C15.7877 19 16.2428 18.8115 16.5783 18.476C16.9138 18.1404 17.1023 17.6854 17.1023 17.2109V10.9488M15.7605 1.55582C16.1163 1.19993 16.599 1 17.1023 1C17.6056 1 18.0883 1.19993 18.4442 1.55582C18.8001 1.9117 19 2.39438 19 2.89768C19 3.40097 18.8001 3.88365 18.4442 4.23954L9.94574 12.738L6.36744 13.6326L7.26201 10.0543L15.7605 1.55582Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
