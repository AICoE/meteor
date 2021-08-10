import React from 'react';
import PropTypes from 'prop-types';
import { Brand, Page, PageHeader } from '@patternfly/react-core';
import Footer from './Footer';

const Layout = ({ children }) => (
  <Page header={<PageHeader logo={<Brand src="/logo192.png" alt="Meteor logo" style={{ height: '1.5em' }} />} logoProps={{ href: '/' }} />}>
    {children}
    <Footer />
  </Page>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
