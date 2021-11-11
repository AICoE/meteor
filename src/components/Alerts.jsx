import React from 'react';
import { Alert, AlertGroup, AlertActionCloseButton } from '@patternfly/react-core';

import { useAlerts } from '../contexts/Alerts';

const Alerts = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alerts, _, setAlerts] = useAlerts();

  const removeAlert = (alert) => {
    setAlerts(alerts.filter((a) => a !== alert));
  };

  return (
    <AlertGroup isToast isLiveRegion>
      {alerts.map((alert, idx) => (
        <Alert
          key={`${alert.title}_${idx}`}
          {...alert}
          actionClose={<AlertActionCloseButton title={alert.title} variantLabel={`${alert.variant} alert`} onClick={() => removeAlert(alert)} />}
        />
      ))}
    </AlertGroup>
  );
};

export default Alerts;
