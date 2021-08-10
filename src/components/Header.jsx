import React from 'react';
import { Bullseye, Text, TextContent, TextVariants } from '@patternfly/react-core';

import styles from './Header.module.scss';

const Header = () => (
  <div className={styles.background}>
    <Bullseye>
      <TextContent className={styles.text}>
        <Text component={TextVariants.h1}>Meteor</Text>
        <p>Take your Jupyter Notebooks for a spin and show your impact.</p>
      </TextContent>
    </Bullseye>
    <div className={styles.small} />
    <div className={styles.medium} />
    <div className={styles.large} />
  </div>
);

export default Header;
