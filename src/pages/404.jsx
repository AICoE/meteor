import React from 'react';
import { Bullseye, Button, TextContent, Title } from '@patternfly/react-core';
import Layout from '../components/Layout';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import NotFoundIcon from '../components/NotFoundIcon';
import Link from 'next/link';

const Page404 = () => (
  <Layout>
    <Bullseye style={{ textAlign: 'center' }}>
      <TextContent>
        <Title headingLevel="h1" size="3xl">
          404: We lost that page
        </Title>
        <NotFoundIcon />
        <Link href="/">
          <Button variant="link" component="a" isLarge>
            Return to homepage <ArrowRightIcon />
          </Button>
        </Link>
      </TextContent>
    </Bullseye>
  </Layout>
);
export default Page404;
