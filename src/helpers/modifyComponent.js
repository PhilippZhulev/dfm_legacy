import React from 'react';

export default function ModifyComponent(children, props) {
  return React.createElement(
    children.type,
    {
      ...children.props,
      ...props,
    },
    children.props.children
  );
}
