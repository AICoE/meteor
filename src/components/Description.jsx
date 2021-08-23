import React from 'react';
import PropTypes from 'prop-types';
import { DescriptionList, DescriptionListTerm, DescriptionListGroup, DescriptionListDescription, Skeleton, Button } from '@patternfly/react-core';
import ExternalLinkSquareAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-square-alt-icon';

import PhaseIcon from './PhaseIcon';
import Time from './Time';
import { useConsole } from '../swr';

const meteorUrlInConsole = (consoleUrl, meteorMeta) =>
  `${consoleUrl}/k8s/ns/${meteorMeta.namespace}/meteor.operate-first.cloud~v1alpha1~Meteor/${meteorMeta.name}`;

const Description = ({ order, isLoading }) => {
  const { consoleUrl } = useConsole();

  const facts = [
    { description: 'Repository URL', value: !isLoading ? <a href={order.spec.url}>{order.spec.url}</a> : <Skeleton /> },
    {
      description: 'Status',
      value: (
        <>
          {order?.status ? (
            <>
              {order.status.phase} <PhaseIcon phase={order.status.phase} />
            </>
          ) : (
            'Unknown'
          )}
          <Button
            style={{ float: 'right', padding: 0 }}
            icon={<ExternalLinkSquareAltIcon />}
            iconPosition="right"
            component="a"
            variant="link"
            href={consoleUrl && order && meteorUrlInConsole(consoleUrl, order.metadata)}
            target="_blank"
            isSmall
            isDisabled={!(consoleUrl && order)}
          >
            Show Details
          </Button>
        </>
      ),
    },
    { description: 'Expires in', value: !isLoading && order?.status && <Time date={new Date(order.status.expirationTimestamp)} /> },
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
      phase: PropTypes.string,
      expirationTimestamp: PropTypes.string,
    }),
  }),
};

export default Description;
