import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Button } from '@patternfly/react-core';

const jupyterHubSpawner = 'https://jupyterhub-opf-jupyterhub.apps.zero.massopen.cloud/hub/spawn';

const Fulfilment = ({ order, isLoading }) => {
  const jupyterBook = (!isLoading && order?.status?.jupyterBook?.url) || '';
  const jupyterHub = (!isLoading && order?.status?.jupyterHub?.name) || '';
  return (
    <Flex
      flex={{ default: 'inlineFlex' }}
      spaceItems={{ modifier: 'spaceItemsXl' }}
      justifyContent={{ default: 'justifyContentCenter' }}
      style={{ width: '100%', marginBottom: '2em' }}
    >
      <FlexItem>
        <Button component="a" variant="primary" isDisabled={jupyterBook === ''} size="3xl" href={`http://${jupyterBook}`}>
          Jupyter Book
        </Button>
      </FlexItem>
      <FlexItem>
        <Button component="a" variant="primary" isDisabled={jupyterHub === ''} size="3xl" href={`${jupyterHubSpawner}?${jupyterHub}`}>
          Interactive Notebook (JupyterLab instance)
        </Button>
      </FlexItem>
    </Flex>
  );
};
Fulfilment.propTypes = {
  isLoading: PropTypes.bool,
  order: PropTypes.shape({
    status: PropTypes.shape({
      jupyterBook: PropTypes.shape({
        url: PropTypes.string,
      }),
      jupyterHub: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }),
};

export default Fulfilment;
