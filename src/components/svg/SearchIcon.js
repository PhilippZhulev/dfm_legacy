import React from 'react';
import SvgInterface from '../ui/SvgInterface';

export default function SearchIcon(props) {
  return (
    <SvgInterface {...props} viewBox='0 0 16 16'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.5 13C2.91015 13 0 10.0899 0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5C13 7.99347 12.4963 9.36929 11.6496 10.4669L15.7211 14.3742C16.093 14.7461 16.093 15.3491 15.7211 15.7211C15.3491 16.093 14.7461 16.093 14.3742 15.7211L10.2779 11.79C9.21322 12.5517 7.90896 13 6.5 13ZM6.5 11C8.98528 11 11 8.98528 11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11Z'
        fill={props.fill}
      />
    </SvgInterface>
  );
}
