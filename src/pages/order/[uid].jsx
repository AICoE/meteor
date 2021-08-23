import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Divider, Flex, FlexItem, PageSection } from '@patternfly/react-core';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Description from '../../components/Description';
import Layout from '../../components/Layout';

import ArrowLeftIcon from '@patternfly/react-icons/dist/js/icons/arrow-left-icon';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import Link from 'next/link';

import { useOrder } from '../../swr';

const Order = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { order, isLoading, isError } = useOrder(uid);

  if (isError) {
    router.push('/404');
    return <Layout />;
  }

  const launchButtons = [
    { name: 'JupyterHub', href: order?.status?.jupyterHub?.url || '' },
    { name: 'website', href: order?.status?.jupyterBook?.url ? `http://${order?.status?.jupyterBook?.url}` : '' },
  ];

  return (
    <Layout>
      <Head>
        <title>Meteor {order?.metadata.name}</title>
      </Head>
      <div style={{ height: '200px', marginBottom: '-200px', backgroundColor: 'var(--pf-c-page__header--BackgroundColor)' }}></div>
      <PageSection style={{ backgroundColor: 'transparent' }}>
        <Flex alignItems={{ default: 'alignItemsFlexStart' }} justifyContent={{ default: 'justifyContentCenter' }}>
          <FlexItem>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link href="/">
                    <Button variant="link" style={{ paddingLeft: 0 }}>
                      <ArrowLeftIcon />
                    </Button>
                  </Link>
                  {order?.metadata?.name}
                </CardTitle>
              </CardHeader>
              <Divider />
              <CardBody>
                <Description isLoading={isLoading} order={order} />
              </CardBody>
              <Divider />
              <CardFooter>
                {launchButtons.map((b) => (
                  <Button key={b.name} variant="link" component="a" target="_blank" href={b.href} isDisabled={!b.href}>
                    Open as {b.name} <ExternalLinkAltIcon />
                  </Button>
                ))}
              </CardFooter>
            </Card>
          </FlexItem>
        </Flex>
      </PageSection>
    </Layout>
  );
};

export default Order;
