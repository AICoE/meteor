import React, { useEffect, useState } from 'react';
import { Accordion, DescriptionList, DescriptionListTerm, DescriptionListGroup, DescriptionListDescription } from '@patternfly/react-core';
import { LogViewer } from '@patternfly/react-log-viewer';
import { useRouter } from 'next/router';

import Step from '../../components/Step';
import DefaultLayout from '../../components/DefaultLayout';

const Description = ({ order }) => (
  <DescriptionList
    columnModifier={{
      default: '2Col',
    }}
  >
    <DescriptionListGroup>
      <DescriptionListTerm>UUID</DescriptionListTerm>
      <DescriptionListDescription>{order.uuid}</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Repository URL</DescriptionListTerm>
      <DescriptionListDescription>
        <a href={order.url}>{order.url}</a>
      </DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Status</DescriptionListTerm>
      <DescriptionListDescription>Running</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Elapsed time</DescriptionListTerm>
      <DescriptionListDescription>1m</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Running instance</DescriptionListTerm>
      <DescriptionListDescription>N/A</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Instance expiration</DescriptionListTerm>
      <DescriptionListDescription>N/A</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Image repository</DescriptionListTerm>
      <DescriptionListDescription>N/A</DescriptionListDescription>
    </DescriptionListGroup>
    <DescriptionListGroup>
      <DescriptionListTerm>Image expiration</DescriptionListTerm>
      <DescriptionListDescription>N/A</DescriptionListDescription>
    </DescriptionListGroup>
  </DescriptionList>
);

const Order = () => {
  const router = useRouter();
  const { uuid } = router.query;

  const [order, setOrder] = useState({});
  const [stage, setStage] = useState(0);

  useEffect(async () => {
    const resp = await fetch(`/api/v1/order?uuid=${uuid}`);
    resp.status == 404 && router.push('/404');
    setOrder(await resp.json());
  }, []);

  const steps = [
    { title: 'Order received', status: 'ok', content: <Description order={order} /> },
    { title: 'Building image', status: 'running', content: <LogViewer hasLineNumbers={true} height={300} /> },
    { title: 'Publishing to Quay', status: 'pending', content: '' },
    { title: 'Deploying image stream', status: 'pending', content: '' },
    { title: 'Starting pod', status: 'pending', content: '' },
  ];

  return (
    <DefaultLayout
      below={
        <Accordion asDefinitionList style={{ width: '800px' }}>
          {steps.map((s, idx) => (
            <Step key={idx} idx={idx} expanded={stage} handleToggle={setStage} {...s} />
          ))}
        </Accordion>
      }
    />
  );
};
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export const getServerSideProps = async () => ({
  props: {},
});

export default Order;
