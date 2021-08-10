import React from 'react';
import { Bullseye, PageSection, Flex, FlexItem, Divider } from '@patternfly/react-core';
import Head from 'next/head';
import Form from '../components/Form';
import Layout from '../components/Layout';
import Header from '../components/Header';

const Index = () => (
  <Layout>
    <Head>
      <title>Meteor</title>
    </Head>
    <Header />
    <PageSection style={{ backgroundColor: 'transparent' }} isFilled>
      <Bullseye>
        <Form />
      </Bullseye>
    </PageSection>
    <PageSection>
      <Flex alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentCenter' }}>
        <FlexItem style={{ maxWidth: '30%' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate explicabo, distinctio eveniet quam voluptates rerum soluta assumenda
          nihil laborum consequuntur eos magnam repellendus, maxime cum iusto illo? Maiores fugit autem ipsam ab ullam laborum, magni expedita
          consectetur sint quas, enim mollitia libero hic! Eos, obcaecati? Sapiente corrupti pariatur et fuga.
        </FlexItem>
        <Divider isVertical />
        <FlexItem style={{ maxWidth: '30%' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates esse facilis a! Suscipit esse facere delectus quo pariatur autem
          aliquid, quos dignissimos, ex fugit laborum. Dignissimos harum error ab quaerat atque non blanditiis cupiditate iusto minima sunt velit
          praesentium illum deserunt obcaecati totam, dolores voluptatibus, porro earum voluptates odit ut? Sed molestiae amet, corrupti dolorem
          laboriosam corporis adipisci aspernatur.
        </FlexItem>
      </Flex>
    </PageSection>
  </Layout>
);

export default Index;
