import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Button } from '@patternfly/react-core';

const Fulfilment = ({ order, isLoading }) => (
  <Flex
    flex={{ default: 'inlineFlex' }}
    spaceItems={{ modifier: 'spaceItemsXl' }}
    justifyContent={{ default: 'justifyContentCenter' }}
    style={{ width: '100%', marginBottom: '2em' }}
  >
    <FlexItem>
      <Button variant="primary" isDisabled={true} size="3xl" href={(!isLoading && order?.jupyterBookUrl) || ''}>
        Jupyter Book
      </Button>
    </FlexItem>
    <FlexItem>
      <Button variant="primary" isDisabled={true} size="3xl" href={(!isLoading && order?.jupyterLabUrl) || ''}>
        Interactive Notebook (JupyterLab instance)
      </Button>
    </FlexItem>
  </Flex>
);
Fulfilment.propTypes = {
  isLoading: PropTypes.bool,
  order: PropTypes.shape({
    jupyterLabUrl: PropTypes.string,
    jupyterBookUrl: PropTypes.string,
  }),
};

export default Fulfilment;
