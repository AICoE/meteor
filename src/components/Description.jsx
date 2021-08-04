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

const Status = ({ conditions }) => (
  <List component={ListComponent.ol} type={OrderType.number}>
    {conditions &&
      conditions.map((i) => (
        <ListItem key={i.type}>
          {i.type}: {i.status}
        </ListItem>
      ))}
  </List>
);

Status.propTypes = {
  conditions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};

const Description = ({ order, isLoading }) => {
  const router = useRouter();
  const calcDuration = () => (order ? Math.floor((new Date() - new Date(order.metadata.creationTimestamp)) / 1000) : 0);

  const facts = [
    { description: 'Name', value: !isLoading ? <a href={router.asPath}>{order.metadata.name}</a> : <Skeleton /> },
    { description: 'UUID', value: !isLoading ? <a href={router.asPath}>{order.metadata.uid}</a> : <Skeleton /> },
    { description: 'Repository URL', value: !isLoading ? <a href={order.spec.url}>{order.spec.url}</a> : <Skeleton /> },
    { description: 'Status', value: !isLoading && (<Status conditions={order?.status?.conditions} /> || <Skeleton />) },
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
    metadata: PropTypes.shape({
      name: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired,
      creationTimestamp: PropTypes.string,
    }),
    spec: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    status: PropTypes.shape({
      conditions: PropTypes.object,
    }),
  }),
};

export default Description;
