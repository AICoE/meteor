import React from 'react';
import { Grid, GridItem, PageSection, Text, TextVariants } from '@patternfly/react-core';

import styles from './Footer.module.css';

const Footer = () => (
  <PageSection className={styles.footer_dark}>
    <Grid className="pf-u-py-xl-on-sm pf-u-py-0-on-md pf-u-align-items-center">
      <GridItem md={2} mdOffset={1}>
        <Text component={TextVariants.a} href="//www.redhat.com" target="top" aria-label="Visit Red Hat.com">
          <img src="/rh_logo.png" alt="Red Hat logo" width="145px" height="613px" />
        </Text>
      </GridItem>
      <GridItem md={4} lg={3} xl={2}>
        <span className="ws-org-pfsite-site-copyright">Copyright &copy; {new Date().getFullYear()} Red Hat, Inc.</span>
      </GridItem>
      <GridItem md={4} lg={5} className="pf-u-ml-xl-on-xl">
        <Text component={TextVariants.a} href="//www.redhat.com/en/about/privacy-policy" target="top" aria-label="Privacy statement">
          Privacy statement
        </Text>
        <Text component={TextVariants.a} href="//www.redhat.com/en/about/terms-use" target="top" aria-label="Terms of use">
          Terms of use
        </Text>
        <Text
          component={TextVariants.a}
          href="//www.redhat.com/en/about/all-policies-guidelines"
          target="top"
          aria-label="All policies and guidelines"
        >
          All policies and guidelines
        </Text>
      </GridItem>
    </Grid>
  </PageSection>
);

export default Footer;
