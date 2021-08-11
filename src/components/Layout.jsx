import React from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import Link from 'next/link';
import { Button, Page, PageHeader, PageHeaderTools, PageHeaderToolsItem } from '@patternfly/react-core';
import { WrappedBrand } from './Wrapped';
import Footer from './Footer';
import GitHubIcon from '@patternfly/react-icons/dist/js/icons/github-icon';
import SlackIcon from '@patternfly/react-icons/dist/js/icons/slack-icon';

const { publicRuntimeConfig } = getConfig();

const Layout = ({ children }) => {
  const headerTools = [
    {
      href: publicRuntimeConfig.github,
      ariaLabel: 'Operate First GitHub organization',
      icon: <GitHubIcon />,
    },
    {
      href: publicRuntimeConfig.slack,
      ariaLabel: 'Operate First Slack workspace',
      icon: <SlackIcon />,
    },
  ];

  return (
    <Page
      header={
        <PageHeader
          logo={<WrappedBrand src="/logo192.png" alt="Meteor logo" style={{ height: '1.5em' }} />}
          logoProps={{ href: '/' }}
          logoComponent={Link}
          headerTools={
            <PageHeaderTools>
              {headerTools.map((t) => (
                <PageHeaderToolsItem key={t.href}>
                  <Button variant="plain" component="a" href={t.href} target="top" aria-label={t.ariaLabel}>
                    {t.icon}
                  </Button>
                </PageHeaderToolsItem>
              ))}
            </PageHeaderTools>
          }
        />
      }
    >
      {children}
      <Footer />
    </Page>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
