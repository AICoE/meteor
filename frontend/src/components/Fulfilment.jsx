import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Button } from '@patternfly/react-core';

const Fulfilment = ({ order }) => (
  <Flex
    flex={{ default: 'inlineFlex' }}
    spaceItems={{ modifier: 'spaceItemsXl' }}
    justifyContent={{ default: 'justifyContentCenter' }}
    style={{ width: '100%', marginBottom: '2em' }}
  >
    <FlexItem>
      <Button variant="primary" isDisabled={true} size="3xl" href={order?.jupyterBookUrl}>
        Jupyter Book
      </Button>
    </FlexItem>
    <FlexItem>
      <Button variant="primary" isDisabled={true} size="3xl" href={order?.jupyterLabUrl}>
        Interactive Notebook (JupyterLab instance)
      </Button>
    </FlexItem>
  </Flex>
);
Fulfilment.propTypes = {
  order: {
    jupyterBookUrl: PropTypes.string,
    jupyterLabUrl: PropTypes.string,
  },
};

export default Fulfilment;
