import React from 'react';
import PropTypes from 'prop-types';
import { DescriptionList, DescriptionListTerm, DescriptionListGroup, DescriptionListDescription, Skeleton } from '@patternfly/react-core';
import { useRouter } from 'next/router';

const Description = ({ order }) => {
  const router = useRouter();
  const calcDuration = () => (order ? Math.floor((new Date() - new Date(order.created)) / 1000) : 0);

  const facts = [
    { description: 'UUID', value: order ? <a href={router.asPath}>{order.uuid}</a> : <Skeleton /> },
    { description: 'Repository URL', value: order ? <a href={order.url}>{order.url}</a> : <Skeleton /> },
    { description: 'Status', value: order?.status?.join(', ') || <Skeleton /> },
    { description: 'Elapsed time', value: `${calcDuration()} s` },
  ];

  return (
    <DescriptionList
      columnModifier={{
        default: '2Col',
      }}
    >
      {facts.map((f) => (
        <DescriptionListGroup key={f.description}>
          <DescriptionListTerm>{f.description}</DescriptionListTerm>
          <DescriptionListDescription>{f.value}</DescriptionListDescription>
        </DescriptionListGroup>
      ))}
    </DescriptionList>
  );
};
Description.propTypes = {
  order: {
    uuid: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    status: PropTypes.arrayOf(PropTypes.string),
    jupyterBookUrl: PropTypes.string,
    jupyterLabUrl: PropTypes.string,
  },
};

export default Description;
