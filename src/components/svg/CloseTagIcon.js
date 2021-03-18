import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function SvgInterface(props) {
  return (
    <div style={props.style} className={props.wrapper ? props.wrapper : ''}>
      <SvgIcon
        viewBox={props.viewBox}
        width={props.width}
        height={props.height}
        fill='none'
        classes={{ root: props.root ? props.root : '' }}>
        {props.children}
      </SvgIcon>
    </div>
  );
}

export default function CloseTagIcon(props) {
  return (
    <SvgInterface {...props} viewBox='0 0 14 14'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14 7C14 10.866 10.8659 14 7 14C3.13407 14 0 10.866 0 7C0 3.13407 3.13407 0 7 0C10.8659 0 14 3.13407 14 7ZM9.23125 10.1939C9.49366 10.4564 9.93134 10.4564 10.1937 10.1939C10.4563 9.93136 10.4563 9.49386 10.1937 9.23127L7.96259 7.00012L10.1937 4.76883C10.4563 4.5064 10.4563 4.0689 10.1937 3.80636C9.93134 3.54392 9.49366 3.54392 9.23125 3.80636L7 6.03765L4.76871 3.80636C4.50616 3.54392 4.06866 3.54392 3.80634 3.80636C3.54379 4.0689 3.54379 4.5064 3.80634 4.76883L6.03741 7.00012L3.80634 9.23127C3.54379 9.49386 3.54379 9.93136 3.80634 10.1939C4.06866 10.4564 4.50616 10.4564 4.76871 10.1939L7 7.96261L9.23125 10.1939Z'
        fill={props.fill}
        fillOpacity={props.fillOpacity}
      />
    </SvgInterface>
  );
}
