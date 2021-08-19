import React from 'react';
import { Brand, Tile } from '@patternfly/react-core';

const wrapWithRef = (Component, Wrapper = 'div') => {
  const newComponent = React.forwardRef((props, ref) => (
    <Wrapper ref={ref}>
      <Component {...props} />
    </Wrapper>
  ));
  newComponent.displayName = `Wrapped${Component.displayName}`;
  return newComponent;
};

export const WrappedTile = wrapWithRef(Tile);
export const WrappedBrand = wrapWithRef(Brand, 'a');
