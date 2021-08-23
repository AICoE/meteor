import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Skeleton } from '@patternfly/react-core';
import Link from 'next/link';
import MeteorIcon from '@patternfly/react-icons/dist/js/icons/meteor-icon';
import { WrappedTile } from './Wrapped';

import { useMeteors } from '../swr';

const MeteorTile = ({ name, content, isLoading }) => (
  <FlexItem style={{ margin: '1em 1em' }}>
    {isLoading ? (
      <Skeleton width="250px" height="6rem" />
    ) : (
      <Link href={`/order/${name}`}>
        <WrappedTile title={name} icon={<MeteorIcon />}>
          {content}
        </WrappedTile>
      </Link>
    )}
  </FlexItem>
);

MeteorTile.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  isLoading: PropTypes.bool,
};

const Meteors = () => {
  const { data: meteors } = useMeteors();

  return (
    <Flex justifyContent={{ default: 'justifyContentCenter' }}>
      {meteors
        ? meteors.map((m) => <MeteorTile key={m.metadata.uid} name={m.metadata.name} content={m.spec.url} />)
        : [...Array(5)].map((_, i) => <MeteorTile key={`skeleton-${i}`} isLoading />)}
    </Flex>
  );
};

export default Meteors;
