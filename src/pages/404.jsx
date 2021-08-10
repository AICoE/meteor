import React from 'react';
import { Bullseye, Button, TextContent, Title } from '@patternfly/react-core';
import Layout from '../components/Layout';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import NotFoundIcon from '../components/NotFoundIcon';

const Page404 = () => (
  <Layout>
    <Bullseye style={{ textAlign: 'center' }}>
      <TextContent>
        <Title headingLevel="h1" size="3xl">
          404: We lost that page
        </Title>
        <NotFoundIcon />
        <Button variant="link" component="a" href="/" isLarge>
          Return to homepage <ArrowRightIcon />
        </Button>
      </TextContent>
    </Bullseye>
  </Layout>
);
export default Page404;
