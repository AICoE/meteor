import React from 'react';
import { Bullseye, PageSection, Flex, FlexItem, Divider, TextContent, TextVariants, Text, Title } from '@patternfly/react-core';
import Head from 'next/head';
import Form from '../components/Form';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Meteors from '../components/Meteors';

const Index = () => (
  <Layout>
    <Head>
      <title>Meteor</title>
    </Head>
    <Header>
      <Bullseye>
        <TextContent style={{ color: 'unset' }}>
          <Text component={TextVariants.h1}>Meteor</Text>
          <Text component={TextVariants.p}>Take your Jupyter Notebooks for a spin and show your impact.</Text>
        </TextContent>
      </Bullseye>
    </Header>
    <PageSection style={{ backgroundColor: 'transparent' }}>
      <Bullseye>
        <Form />
      </Bullseye>
    </PageSection>
    <PageSection isFilled>
      <Flex alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentCenter' }}>
        <FlexItem style={{ maxWidth: '30%' }}>
          Project Meteor is an open source technology that automates the creation of interactive environments alongside publication-quality static
          content. It provides a single tool for users to explore and test drive services, tools, and emerging technologies for developing
          intelligent applications. This project is being developed by members of the Red Hat's Artificial Intelligence Center of Excellence
          (AICoE), who hope to create better visibility and impact of projects developed in the open.
        </FlexItem>
        <Divider isVertical />
        <FlexItem style={{ maxWidth: '30%' }}>
          How it works: 1) Provide a link to your GitHub repo in the form above. 2) Our bots will look for dependency files, such as Pipfiles, and
          use this information in our pipelines to build container images of your repository. 3) Interact with your Jupyter notebooks in a live JupyterLab
          environment, or view organized, high-quality, and easily shareable static content in a JupyterBook.
          New to Meteor? Check out the available meteors below to explore the environment, or view the source code on <a href={"https://github.com/AICoE/meteor"}>Github</a>.
        </FlexItem>
      </Flex>
    </PageSection>
    <PageSection>
      <Bullseye>
        <TextContent>
          <Title headingLevel="h6" size="md">
            Available meteors
          </Title>
        </TextContent>
      </Bullseye>
    </PageSection>
    <PageSection>
      <Bullseye>
        <Meteors />
      </Bullseye>
    </PageSection>
  </Layout>
);

export default Index;
