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

export default function Reboot(props) {
  return (
    <svg
      width={props.width === undefined ? '13' : props.width}
      height={props.height === undefined ? '18' : props.height}
      viewBox='0 0 13 18'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.51906 4.09787C5.17204 4.09787 4.02199 4.5766 3.06892 5.53404C2.11584 6.49149 1.6393 7.64681 1.6393 9C1.6393 9.81702 1.82991 10.583 2.21114 11.2979L0.991202 12.4851C0.330401 11.4128 0 10.2511 0 9C0 7.18723 0.635386 5.64255 1.90616 4.36596C3.17693 3.08936 4.71457 2.45106 6.51906 2.45106V0L9.75953 3.29362L6.51906 6.54894V4.09787ZM12.0088 5.51489C12.6696 6.58723 13 7.74894 13 9C13 10.8128 12.3646 12.3574 11.0938 13.634C9.82307 14.9106 8.29814 15.5489 6.51906 15.5489V18L3.24047 14.7064L6.51906 11.4511V13.9021C7.86608 13.9021 9.01613 13.4234 9.96921 12.466C10.9223 11.5085 11.3988 10.3532 11.3988 9C11.3988 8.20851 11.2082 7.44255 10.827 6.70213L12.0088 5.51489Z'
        fill='#657D95'
      />
    </svg>
  );
}
