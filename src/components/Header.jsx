import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.module.scss';

const Header = ({ children }) => (
  <div className={styles.background}>
    {children}
    <div className={styles.small} />
    <div className={styles.medium} />
    <div className={styles.large} />
  </div>
);

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
export default Header;
