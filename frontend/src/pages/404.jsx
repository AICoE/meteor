import React from 'react';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import DefaultLayout from '../components/DefaultLayout';

const Page404 = () => (
  <DefaultLayout
    besides={
      <TextContent className="text-content">
        <Text component={TextVariants.h1}>Nothing is here.</Text>
        <Text component={TextVariants.p}>{"Seems like there's nothing in here."}</Text>
      </TextContent>
    }
  />
);
export default Page404;
