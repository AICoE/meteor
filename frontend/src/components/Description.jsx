import React from 'react';
import PropTypes from 'prop-types';
import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Skeleton,
  List,
  ListItem,
  ListComponent,
  OrderType,
} from '@patternfly/react-core';
import { useRouter } from 'next/router';

const Status = ({ status }) => (
  <List component={ListComponent.ol} type={OrderType.number}>
    {status && status.map((i) => <ListItem key={i}>{i}</ListItem>)}
  </List>
);

Status.propTypes = {
  status: PropTypes.arrayOf(PropTypes.string),
};

const Description = ({ order, isLoading }) => {
  const router = useRouter();
  const calcDuration = () => (order ? Math.floor((new Date() - new Date(order.created)) / 1000) : 0);

  const facts = [
    { description: 'UUID', value: !isLoading ? <a href={router.asPath}>{order.uid}</a> : <Skeleton /> },
    { description: 'Repository URL', value: !isLoading ? <a href={order.url}>{order.url}</a> : <Skeleton /> },
    { description: 'Status', value: !isLoading && (<Status status={order?.status} /> || <Skeleton />) },
    { description: 'Elapsed time', value: !isLoading && `${calcDuration()} s` },
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
  isLoading: PropTypes.bool,
  order: PropTypes.shape({
    created: PropTypes.string,
    uid: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    status: PropTypes.arrayOf(PropTypes.string),
    jupyterBookUrl: PropTypes.string,
    jupyterLabUrl: PropTypes.string,
  }),
};

export default Description;
