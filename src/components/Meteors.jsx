import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Tile } from '@patternfly/react-core';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useMeteors = () => {
  const { data, error } = useSWR('/api/meteors', fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

const Meteors = () => {
  const { data: meteors } = useMeteors();
  const router = useRouter();

  return (
    <Flex justifyContent={{ default: 'justifyContentCenter' }}>
      {meteors &&
        meteors.map((m) => (
          <FlexItem key={m.metadata.uid} style={{ margin: '1em 1em' }}>
            <Tile title={m.metadata.name} onClick={() => router.push(`/order/${m.metadata.name}`)}>
              {m.spec.url}
            </Tile>
          </FlexItem>
        ))}
    </Flex>
  );
};

export default Meteors;
