import React from 'react';
import { Accordion, Bullseye } from '@patternfly/react-core';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';

import Step from '../components/Step';
import Description from '../components/Description';
import Fulfilment from '../components/Fulfilment';

const fetcher = (uuid) => uuid && fetch(`/api/v1/order?uuid=${uuid}`).then((res) => res.json());

const useOrder = (uuid) => {
  const { data, error } = useSWR(uuid, fetcher);

  return {
    order: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const Order = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { order } = useOrder(uuid);

  const steps = [
    { title: 'Order details', status: 'ok', content: <Description order={order} /> },
    { title: 'Fulfilment', status: 'running', content: <Fulfilment order={order} /> },
  ];

  return (
    <Bullseye height="100%" className="cover">
      <Head>
        <title>Meteor no. {order?.uuid}</title>
      </Head>
      <Accordion asDefinitionList style={{ width: '800px' }}>
        {steps.map((s, idx) => (
          <Step key={idx} idx={0} expanded={0} handleToggle={() => {}} {...s} />
        ))}
      </Accordion>
    </Bullseye>
  );
};

export default Order;
