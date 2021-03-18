import React from 'react';

export default function NewEdit(props) {
  return (
    <svg
      width={props.width === undefined ? '17' : props.width}
      height={props.height === undefined ? '17' : props.height}
      viewBox='0 0 17 17'
      fill={!props.color ? '#fff' : props.color}
      style={{ ...props.style, position: 'relative' }}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.1686 1.75C13.9481 1.75 13.7366 1.83759 13.5807 1.99351L6.64557 8.92866L6.25364 10.4964L7.82134 10.1044L14.7565 3.16928C14.9124 3.01337 15 2.8019 15 2.5814C15 2.3609 14.9124 2.14943 14.7565 1.99351C14.6006 1.83759 14.3891 1.75 14.1686 1.75ZM12.5201 0.932851C12.9573 0.495629 13.5503 0.25 14.1686 0.25C14.7869 0.25 15.3799 0.495629 15.8171 0.932851C16.2544 1.37007 16.5 1.96307 16.5 2.5814C16.5 3.19972 16.2544 3.79272 15.8171 4.22994L8.73511 11.312C8.63899 11.4081 8.51855 11.4763 8.38668 11.5093L5.40477 12.2547C5.14919 12.3186 4.87882 12.2437 4.69254 12.0575C4.50625 11.8712 4.43137 11.6008 4.49526 11.3452L5.24074 8.36332C5.27371 8.23144 5.3419 8.11101 5.43802 8.01489L12.5201 0.932851ZM0.656361 2.48776C1.07662 2.0675 1.64662 1.8314 2.24096 1.8314H7.4593C7.87351 1.8314 8.2093 2.16718 8.2093 2.5814C8.2093 2.99561 7.87351 3.3314 7.4593 3.3314H2.24096C2.04444 3.3314 1.85598 3.40946 1.71702 3.54842C1.57806 3.68737 1.5 3.87584 1.5 4.07235V14.509C1.5 14.7056 1.57806 14.894 1.71702 15.033C1.85598 15.1719 2.04444 15.25 2.24096 15.25H12.6776C12.8742 15.25 13.0626 15.1719 13.2016 15.033C13.3405 14.894 13.4186 14.7056 13.4186 14.509V9.2907C13.4186 8.87649 13.7544 8.5407 14.1686 8.5407C14.5828 8.5407 14.9186 8.87649 14.9186 9.2907V14.509C14.9186 15.1034 14.6825 15.6734 14.2622 16.0936C13.842 16.5139 13.272 16.75 12.6776 16.75H2.24096C1.64662 16.75 1.07662 16.5139 0.656361 16.0936C0.2361 15.6734 0 15.1034 0 14.509V4.07235C0 3.47801 0.2361 2.90802 0.656361 2.48776Z'
        fill='#657D95'
      />
    </svg>
  );
}