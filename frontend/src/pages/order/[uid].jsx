import React from 'react';
import { Accordion, Bullseye } from '@patternfly/react-core';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';

import Step from '../../components/Step';
import Description from '../../components/Description';
import Fulfilment from '../../components/Fulfilment';

const fetcher = (uid) => uid && fetch(`/api/v1/order?uid=${uid}`).then((res) => res.json());

const useOrder = (uid) => {
  const { data, error } = useSWR(uid, fetcher);

  return {
    order: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const Order = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { order, isLoading, isError } = useOrder(uid);

  if (isError) {
    router.push('/404');
    return <div className="cover" />;
  }

  const steps = [
    { title: 'Order details', status: 'ok', content: <Description isLoading={isLoading} order={order} /> },
    { title: 'Fulfilment', status: 'running', content: <Fulfilment isLoading={isLoading} order={order} /> },
  ];

  return (
    <Bullseye height="100%" className="cover">
      <Head>
        <title>Meteor no. {order?.uid}</title>
      </Head>
      <Accordion asDefinitionList style={{ width: '800px' }}>
        {steps.map((s, idx) => (
          <Step key={idx} {...s} />
        ))}
      </Accordion>
    </Bullseye>
  );
};

export default Order;
