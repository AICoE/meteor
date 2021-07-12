import React, { useEffect, useState } from 'react';
import {
  Accordion,
  Bullseye,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Flex,
  FlexItem,
  Button,
} from '@patternfly/react-core';
import { useRouter } from 'next/router';

import Step from '../../components/Step';

const Description = ({ order }) => {
  const router = useRouter();
  const calcDuration = () => Math.floor((new Date() - new Date(order.created)) / 1000);

  return (
    <DescriptionList
      columnModifier={{
        default: '2Col',
      }}
    >
      <DescriptionListGroup>
        <DescriptionListTerm>UUID</DescriptionListTerm>
        <DescriptionListDescription>
          <a href={router.asPath}>{order.uuid}</a>
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Repository URL</DescriptionListTerm>
        <DescriptionListDescription>
          <a href={order.url}>{order.url}</a>
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Status</DescriptionListTerm>
        <DescriptionListDescription>{order.status && order.status.join(', ')}</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Elapsed time</DescriptionListTerm>
        <DescriptionListDescription>{calcDuration()} s</DescriptionListDescription>
      </DescriptionListGroup>
    </DescriptionList>
  );
};

const Fulfilment = (order) => (
  <Flex
    flex={{ default: 'inlineFlex' }}
    spaceItems={{ modifier: 'spaceItemsXl' }}
    justifyContent={{ default: 'justifyContentCenter' }}
    style={{ width: '100%', marginBottom: '2em' }}
  >
    <FlexItem>
      <Button variant="primary" isDisabled={true} size="3xl">
        Jupyter Book
      </Button>
    </FlexItem>
    <FlexItem>
      <Button variant="primary" isDisabled={true} size="3xl">
        Interactive Notebook (JupyterLab instance)
      </Button>
    </FlexItem>
  </Flex>
);

const Order = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const [order, setOrder] = useState({});

  useEffect(async () => {
    const resp = await fetch(`/api/v1/order?uuid=${uuid}`);
    resp.status == 404 && router.push('/404');
    setOrder(await resp.json());
  }, []);

  const steps = [
    { title: 'Order details', status: 'ok', content: <Description order={order} /> },
    { title: 'Fulfilment', status: 'running', content: <Fulfilment order={order} /> },
  ];

  return (
    <Bullseye height="100%" className="cover">
      <Accordion asDefinitionList style={{ width: '800px' }}>
        {steps.map((s, idx) => (
          <Step key={idx} idx={0} expanded={0} handleToggle={() => {}} {...s} />
        ))}
      </Accordion>
    </Bullseye>
  );
};
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export const getServerSideProps = async () => ({
  props: {},
});

export default Order;
