import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AlertsContext = createContext();

export const useAlerts = () => useContext(AlertsContext);

export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (alert) => {
    setAlerts([...alerts, alert]);
    setTimeout(() => setAlerts(alerts.filter((a) => a !== alert)), 10000);
  };

  return <AlertsContext.Provider value={[alerts, addAlert, setAlerts]}>{children}</AlertsContext.Provider>;
};

AlertsProvider.propTypes = {
  children: PropTypes.node,
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      variant: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};
