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

export default function RoleArch(props) {
  return (
    <svg
      width={props.width === undefined ? '20' : props.width}
      height={props.height === undefined ? '14' : props.height}
      viewBox='0 0 20 14'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.21781 5.98731C6.43301 5.98731 6.64301 5.94938 6.84242 5.8745C7.54441 5.61076 7.87101 4.96513 7.57043 4.43527C7.36203 4.06787 6.90484 3.83962 6.37703 3.83962C6.16183 3.83962 5.95183 3.87755 5.75242 3.95243C5.05043 4.21616 4.72382 4.86179 5.02422 5.39166C5.23281 5.75908 5.69 5.98731 6.21781 5.98731ZM6.14281 4.64088C6.21781 4.61271 6.29879 4.5979 6.37703 4.5979C6.53722 4.5979 6.67062 4.65732 6.72484 4.75303C6.80863 4.90084 6.68363 5.0993 6.45203 5.18623C6.37703 5.2144 6.29605 5.22921 6.21781 5.22921C6.05761 5.22921 5.92422 5.16979 5.87 5.07406C5.78641 4.92624 5.91121 4.72797 6.14281 4.64088Z'
        fill='#FFE600'
      />
      <path
        d='M5.1898 8.55291C5.1898 8.73652 5.3782 8.88987 5.60379 8.88987C5.82941 8.88987 6.01778 8.73668 6.01778 8.55291C6.01778 8.36929 5.82958 8.21591 5.60379 8.21591C5.3782 8.21591 5.1898 8.3691 5.1898 8.55291Z'
        fill='#FFE600'
      />
      <path
        d='M6.6386 8.92341C6.41301 8.92341 6.22461 9.0766 6.22461 9.2604C6.22461 9.44402 6.41281 9.59737 6.6386 9.59737C6.86418 9.59737 7.05258 9.44418 7.05258 9.2604C7.05262 9.07676 6.86418 8.92341 6.6386 8.92341Z'
        fill='#FFE600'
      />
      <path
        d='M7.44579 8.199C7.44579 8.01535 7.25739 7.862 7.0318 7.862C6.80621 7.862 6.61781 8.01519 6.61781 8.199C6.61781 8.38261 6.80601 8.53596 7.0318 8.53596C7.25762 8.53596 7.44579 8.38277 7.44579 8.199Z'
        fill='#FFE600'
      />
      <path
        d='M20 11.2515C20 10.0997 19.4504 8.56756 19.149 7.75667C18.8636 6.98929 18.5244 6.27788 18.2616 5.8001C19.09 5.56485 19.675 4.92249 19.675 4.16911C19.675 3.21694 18.7178 2.44239 17.548 2.44239C17.1032 2.44239 16.6728 2.5565 16.3186 2.76097C15.7956 2.01799 15.025 1.38002 14.063 0.896702C12.8656 0.294883 11.4324 -0.0043379 10.0006 5.10599e-05C8.56902 -0.0044975 7.13601 0.294856 5.93863 0.896542C4.97663 1.38002 4.20722 2.01783 3.68422 2.76081C3.33003 2.5565 2.90222 2.44223 2.45742 2.44223C1.28761 2.44223 0.335817 3.21678 0.335817 4.16895C0.335817 4.92236 0.93183 5.56472 1.76023 5.79994C1.49722 6.27772 1.13621 6.98913 0.850817 7.75651C0.549608 8.56756 0 10.0997 0 11.2515V11.8663L1.00539 11.4727C0.958595 11.9557 0.990784 12.6156 1.22801 13.2958L1.47422 13.9705L2.65683 12.8789C3.53683 13.5966 4.62944 14 5.77144 14H14.2286C15.3706 14 16.4578 13.5966 17.3378 12.879L18.5148 13.9772L18.7502 13.2992C18.9875 12.619 19.0414 11.9575 18.9948 11.4744L20 11.8665V11.2515ZM18.7722 4.47907L17.9176 5.17011C17.9166 5.1421 17.916 5.11492 17.9164 5.08855C17.9192 4.825 17.991 4.63796 18.1276 4.54842C18.2672 4.45676 18.4876 4.44976 18.6746 4.46734C18.7086 4.47059 18.7412 4.47469 18.7722 4.47907ZM1.22781 4.47907C1.25879 4.47469 1.29141 4.47062 1.32539 4.46737C1.51239 4.44979 1.73278 4.45678 1.87239 4.54845C2.00899 4.63814 2.08078 4.82519 2.08359 5.08858C2.08379 5.11497 2.08359 5.14215 2.08239 5.17014L1.22781 4.47907ZM17.652 10.0927L17.9076 10.9007C17.91 10.9085 18.1048 11.5502 18.0186 12.3477L17.3356 11.7066L16.9854 12.0394C16.2304 12.7884 15.2513 13.186 14.2286 13.186H5.77141C4.74859 13.186 3.76941 12.7884 3.01461 12.0394L2.66441 11.6993L1.9816 12.344C1.89539 11.5464 2.0902 10.9065 2.09261 10.8989L2.3482 10.0919L1.06641 10.6171C1.19441 9.67222 1.55422 8.60108 1.7866 7.97628C2.22461 6.79817 2.68242 5.92073 2.84422 5.74036L3.3884 5.13412L3.01441 5.13558C3.02101 4.60114 2.83461 4.20606 2.45722 3.95844C2.18601 3.78035 1.82761 3.69343 1.41484 3.70351C1.61745 3.40415 2.00905 3.20064 2.45784 3.20064C2.84507 3.20064 3.20944 3.35513 3.43265 3.61413L3.91124 4.1694L4.24144 3.54673C4.66984 2.73879 5.42585 2.08129 6.42804 1.57779C7.46245 1.05736 8.68343 0.813977 9.95866 0.813977H9.97686C9.98467 0.813977 9.99226 0.814136 10.0001 0.814136C10.0078 0.814136 10.0155 0.813977 10.0233 0.813977H10.0415C11.3167 0.813977 12.5375 1.05734 13.5725 1.57747C14.5745 2.08098 15.3307 2.7564 15.7591 3.56434L16.0893 4.17805L16.5679 3.61836C16.7911 3.35955 17.1555 3.20277 17.5427 3.20277C17.9915 3.20277 18.3831 3.40495 18.5857 3.70446C18.1729 3.69438 17.8145 3.78083 17.5433 3.95892C17.1659 4.20667 16.9795 4.60146 16.9861 5.1359L16.6121 5.13425L17.1563 5.74049C17.3183 5.92086 17.7759 6.79847 18.2141 7.97657C18.4463 8.60134 18.8063 9.6727 18.9343 10.6175L17.652 10.0927Z'
        fill='#FFE600'
      />
      <path
        d='M15.5016 6.92109L15.086 7.09218C15.2838 7.41026 15.384 7.75377 15.384 8.11321C15.384 9.36231 14.1356 10.3784 12.601 10.3784C11.7344 10.3784 10.9322 10.0582 10.4004 9.4997L10.3494 9.44612C10.3206 8.86774 10.2978 7.88089 10.4348 7.35493L10.9678 6.92109L11.5252 6.45421C11.6408 6.36013 11.5588 6.18609 11.3954 6.18609H8.60461C8.44121 6.18609 8.35922 6.3601 8.4748 6.45421L9.03219 6.9146L9.5652 7.35169C9.70219 7.87767 9.67938 8.86614 9.65059 9.44453L9.59958 9.49893C9.06758 10.0573 8.26559 10.378 7.39879 10.378C5.86438 10.378 4.61578 9.36202 4.61578 8.1131C4.61578 7.75364 4.71598 7.41031 4.91379 7.09223L4.08261 6.75005C3.8184 7.17525 3.68441 7.60063 3.68441 8.08004C3.68461 9.74686 5.35101 11.0699 7.39902 11.0699C7.40043 11.0699 7.40003 11.0699 7.40003 11.0699V12.6978H12.6V11.0699C12.6 11.0699 12.5994 11.0699 12.601 11.0699C14.6492 11.0699 16.3154 9.74702 16.3154 8.07988C16.3154 7.60047 16.1814 7.15849 15.9172 6.73327L15.5016 6.92109ZM9.6 12.0465H8.4V11.0402C8.8 10.9508 9.2 10.8007 9.6 10.5964V12.0465ZM11.6 12.0465H10.4V10.5964C10.8 10.8007 11.2 10.9508 11.6 11.0402V12.0465Z'
        fill='#FFE600'
      />
      <path
        d='M13.1576 5.87452C13.3568 5.9494 13.567 5.98733 13.7822 5.98733C14.31 5.98733 14.7672 5.75911 14.9756 5.39185C15.276 4.86198 14.9494 4.21635 14.2476 3.95261C14.0484 3.87773 13.8382 3.8398 13.623 3.8398C13.0952 3.8398 12.638 4.06803 12.4296 4.43545C12.129 4.96516 12.4556 5.61079 13.1576 5.87452ZM13.2752 4.75303C13.3294 4.65732 13.4628 4.5979 13.623 4.5979C13.7012 4.5979 13.7822 4.61271 13.8572 4.64088C14.0888 4.72797 14.2138 4.92624 14.13 5.07406C14.0759 5.16979 13.9425 5.22921 13.7822 5.22921C13.704 5.22921 13.623 5.2144 13.548 5.18623C13.3162 5.09914 13.1914 4.90071 13.2752 4.75303Z'
        fill='#FFE600'
      />
      <path
        d='M14.3962 8.21591C14.1706 8.21591 13.9822 8.3691 13.9822 8.55291C13.9822 8.73652 14.1704 8.88987 14.3962 8.88987C14.6218 8.88987 14.8102 8.73668 14.8102 8.55291C14.8102 8.3691 14.6218 8.21591 14.3962 8.21591Z'
        fill='#FFE600'
      />
      <path
        d='M13.3614 9.59737C13.587 9.59737 13.7754 9.44418 13.7754 9.2604C13.7754 9.07679 13.587 8.92341 13.3614 8.92341C13.1358 8.92341 12.9474 9.0766 12.9474 9.2604C12.9474 9.44402 13.1356 9.59737 13.3614 9.59737Z'
        fill='#FFE600'
      />
      <path
        d='M13.382 8.199C13.382 8.01535 13.1936 7.862 12.968 7.862C12.7424 7.862 12.554 8.01519 12.554 8.199C12.554 8.38261 12.7424 8.53596 12.968 8.53596C13.1938 8.53596 13.382 8.38277 13.382 8.199Z'
        fill='#FFE600'
      />
      <path d='M11.6 5.53492V4.72097H8.4V5.53492H11.6Z' fill='#FFE600' />
    </svg>
  );
}
