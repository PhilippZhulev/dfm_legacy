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

export default function LoginLogo(props) {
  return (
    <svg
      width={props.width === undefined ? '176' : props.width}
      height={props.height === undefined ? '98' : props.height}
      viewBox='0 0 126 48'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0.379883 12.6575H10.7967C14.5101 12.6575 17.3193 13.5979 19.2242 15.4787C21.1532 17.3354 22.1178 20.3254 22.1178 24.4487C22.1178 28.3792 21.1532 31.2848 19.2242 33.1656C17.3193 35.0223 14.5101 35.9506 10.7967 35.9506H0.379883V12.6575ZM9.92863 30.7422C11.1343 30.7422 12.1109 30.5734 12.8584 30.2359C13.6059 29.8742 14.1725 29.2472 14.5583 28.355C14.9683 27.4387 15.1732 26.1366 15.1732 24.4487C15.1732 22.7367 14.9924 21.4105 14.6307 20.4701C14.269 19.5056 13.7023 18.8304 12.9307 18.4446C12.1832 18.0588 11.1825 17.8659 9.92863 17.8659H7.17975V30.7422H9.92863Z'
        fill='white'
      />
      <path
        d='M43.1444 12.6575H60.6504V17.7212H49.9443V21.736H59.276V26.8721H49.9443V35.9506H43.1444V12.6575Z'
        fill='white'
      />
      <path
        d='M80.434 12.6575H87.053L92.8401 24.4849L98.5911 12.6575H105.174V35.9506H98.3741V24.3041L94.6486 31.972H90.9955L87.2339 24.3041V35.9506H80.434V12.6575Z'
        fill='white'
      />
      <path
        d='M112.861 12.5037H115.128V20.2681H112.861V12.5037Z'
        fill='#9FB9FF'
      />
      <path
        d='M120.931 14.1916H118.749V12.5037H125.38V14.1916H123.198V20.2681H120.931V14.1916Z'
        fill='#9FB9FF'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M51.2527 46.8105C63.9718 46.8105 74.2731 36.5572 74.2731 23.9208C74.2731 11.2844 63.9718 1.03103 51.2527 1.03103C38.5335 1.03103 28.2322 11.2844 28.2322 23.9208C28.2322 36.5572 38.5335 46.8105 51.2527 46.8105ZM51.2527 47.8416C64.5359 47.8416 75.3042 37.1319 75.3042 23.9208C75.3042 10.7097 64.5359 0 51.2527 0C37.9694 0 27.2012 10.7097 27.2012 23.9208C27.2012 37.1319 37.9694 47.8416 51.2527 47.8416Z'
        fill='#88A4EE'
      />
      <circle
        cx='65.8072'
        cy='5.67001'
        r='5.56485'
        transform='rotate(-180 65.8072 5.67001)'
        fill='#109BD1'
      />
      <circle
        cx='36.1285'
        cy='41.5321'
        r='5.56485'
        transform='rotate(-180 36.1285 41.5321)'
        fill='#55DCC4'
      />
    </svg>
  );
}
