import React from 'react';
import {
  Bullseye,
  Button,
  PageSection,
  Flex,
  FlexItem,
  Divider,
  TextContent,
  TextVariants,
  Text,
  TextList,
  TextListItem,
  TextListVariants,
} from '@patternfly/react-core';
import GitHubIcon from '@patternfly/react-icons/dist/js/icons/github-icon';
import Head from 'next/head';
import getConfig from 'next/config';
import Form from '../components/Form';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Meteors from '../components/Meteors';
import MeteorsTitle from '../components/MeteorsTitle';

const { publicRuntimeConfig } = getConfig();

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
      <Bullseye>
        <Flex style={{ maxWidth: '1000px' }} alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentCenter' }}>
          <FlexItem flex={{ default: 'flex_1' }}>
            <TextContent>
              <Text component={TextVariants.p}>
                <b>Project Meteor</b> is an open source technology that automates the creation of interactive environments alongside
                publication-quality static content.
              </Text>
              <Text component={TextVariants.p}>
                It provides a single tool for users to explore and test drive services, tools, and emerging technologies for developing intelligent
                applications. This project is being developed by members of the <span style={{ whiteSpace: 'nowrap' }}>Red Hat{"'"}s</span> Artificial
                Intelligence Center of Excellence (AICoE), who hope to create better visibility and impact of projects developed in the open.
              </Text>
              <Bullseye style={{ marginTop: '2em' }}>
                <Button component="a" href={publicRuntimeConfig.github} variant="primary" isLarge>
                  <GitHubIcon /> GitHub
                </Button>
              </Bullseye>
            </TextContent>
          </FlexItem>
          <Divider isVertical />
          <FlexItem flex={{ default: 'flex_1' }}>
            <TextContent>
              <Text component={TextVariants.h5}>How it works:</Text>
              <TextList component={TextListVariants.ol}>
                <TextListItem>Provide a link to your GitHub repo in the form above.</TextListItem>
                <TextListItem>
                  Our bots will look for dependency files, such as Pipfiles, and use this information in our pipelines to build container images of
                  your repository.
                </TextListItem>
                <TextListItem>
                  Interact with your Jupyter notebooks in a live JupyterLab environment, or view organized, high-quality, and easily shareable static
                  content in a JupyterBook.
                </TextListItem>
              </TextList>
              <Text component={TextVariants.h5}>New to Meteor?</Text>
              <Text component={TextVariants.p}>
                Check out the available meteors below to explore the environment, or view the source code on{' '}
                <Text component={TextVariants.a} href={publicRuntimeConfig.github}>
                  GitHub
                </Text>
                .
              </Text>
            </TextContent>
          </FlexItem>
        </Flex>
      </Bullseye>
    </PageSection>
    <PageSection>
      <Bullseye>
        <TextContent>
          <MeteorsTitle />
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
