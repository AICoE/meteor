import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Skeleton } from '@patternfly/react-core';
import Link from 'next/link';
import MeteorIcon from '@patternfly/react-icons/dist/js/icons/meteor-icon';
import { WrappedTile } from './Wrapped';

import { useMeteors, prefetch } from '../swr';
import PhaseIcon from './PhaseIcon';

const MeteorTile = ({ name, content, isLoading, phase }) => (
  <FlexItem style={{ margin: '1em 1em' }}>
    {isLoading ? (
      <Skeleton width="250px" height="6rem" />
    ) : (
      <Link href={`/order/${name}`}>
        <WrappedTile
          onMouseEnter={() => prefetch(`/api/meteor/${name}`)}
          title={
            <React.Fragment>
              {name} <PhaseIcon phase={phase} />
            </React.Fragment>
          }
          icon={<MeteorIcon />}
        >
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
  phase: PropTypes.string,
};

const Meteors = () => {
  const { data: meteors } = useMeteors();

  return (
    <Flex justifyContent={{ default: 'justifyContentCenter' }}>
      {meteors
        ? meteors.map((m) => <MeteorTile key={m.metadata.uid} name={m.metadata.name} content={m.spec.url} phase={m.status.phase} />)
        : [...Array(5)].map((_, i) => <MeteorTile key={`skeleton-${i}`} isLoading />)}
    </Flex>
  );
};

export default Meteors;
