import React from 'react';
import PropTypes from 'prop-types';
import { Bullseye, Flex, FlexItem } from '@patternfly/react-core';
import Head from 'next/head';

import { LogoCard } from './LogoCard';

export const DefaultLayout = ({ besides, below }) => (
  <Bullseye height="100%" className="cover">
    <Head>
      <title>Meteor</title>
    </Head>
    <Flex direction={{ default: 'column' }} alignItems={{ default: 'alignItemsCenter' }} className="flex-spacing__vertical" width="100%">
      <Flex className="flex-spacing__horizontal">
        <FlexItem>
          <LogoCard />
        </FlexItem>
        {besides && <FlexItem>{besides}</FlexItem>}
      </Flex>
      <FlexItem>{below}</FlexItem>
    </Flex>
  </Bullseye>
);

DefaultLayout.propTypes = {
  besides: PropTypes.node,
  below: PropTypes.node,
};

export default DefaultLayout;
