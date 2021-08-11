import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Skeleton, Tile } from '@patternfly/react-core';
import useSWR from 'swr';
import Link from 'next/link';
import MeteorIcon from '@patternfly/react-icons/dist/js/icons/meteor-icon';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useMeteors = () => {
  const { data, error } = useSWR('/api/meteors', fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

const MeteorTile = ({ name, content, isLoading }) => (
  <FlexItem style={{ margin: '1em 1em' }}>
    {isLoading ? (
      <Skeleton width="250px" height="6rem" />
    ) : (
      <Link href={`/order/${name}`}>
        <Tile title={name} icon={<MeteorIcon />}>
          {content}
        </Tile>
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
