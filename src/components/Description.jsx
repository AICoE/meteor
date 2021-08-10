import React from 'react';
import PropTypes from 'prop-types';
import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Skeleton,
  Spinner,
  Button,
} from '@patternfly/react-core';
import ExternalLinkSquareAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-square-alt-icon';

const Description = ({ order, isLoading }) => {
  const calcExpiration = () => (order ? order.spec.ttl - Math.floor((new Date() - new Date(order.metadata.creationTimestamp)) / 1000) : 0);

  const facts = [
    { description: 'Repository URL', value: !isLoading ? <a href={order.spec.url}>{order.spec.url}</a> : <Skeleton /> },
    {
      description: 'Status',
      value: (
        <>
          Building <Spinner isSVG size="sm" />{' '}
          <Button
            style={{ float: 'right', padding: 0 }}
            icon={<ExternalLinkSquareAltIcon />}
            iconPosition="right"
            component="a"
            variant="link"
            isSmall
          >
            Show Details
          </Button>
        </>
      ),
    },
    { description: 'Expires at', value: !isLoading && `${calcExpiration()} s` },
  ];

  return (
    <DescriptionList
      columnModifier={{
        default: '1Col',
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
      creationTimestamp: PropTypes.string,
    }),
    spec: PropTypes.shape({
      ttl: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    }),
    status: PropTypes.shape({
      conditions: PropTypes.object,
    }),
  }),
};

export default Description;
