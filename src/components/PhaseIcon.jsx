import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@patternfly/react-core';

import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';

const PhaseIcon = ({ phase, ...props }) => {
  const options = {
    Ready: [CheckCircleIcon, { color: 'green' }],
    Building: [Spinner, { isSVG: true, size: 'sm' }],
    Failed: [ExclamationCircleIcon, { color: 'red' }],
  };

  const [IconComponent, iconProps] = options[phase];

  return <IconComponent {...iconProps} {...props} />;
};

PhaseIcon.propTypes = {
  phase: PropTypes.string,
  ...CheckCircleIcon.propTypes,
  ...ExclamationCircleIcon.propTypes,
  ...Spinner.propTypes,
};

export default PhaseIcon;
