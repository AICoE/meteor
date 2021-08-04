import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionToggle, AccordionContent, Spinner } from '@patternfly/react-core';
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import PendingIcon from '@patternfly/react-icons/dist/js/icons/pending-icon';

const statusIcon = {
  ok: <CheckCircleIcon />,
  running: <Spinner isSVG size="md" />,
  pending: <PendingIcon />,
};

export const Step = ({ title, status, content }) => (
  <AccordionItem>
    <AccordionToggle isExpanded={true}>
      {status && statusIcon[status]} {title}
    </AccordionToggle>
    <AccordionContent isHidden={false}>{content ? content : 'This step has not started yet.'}</AccordionContent>
  </AccordionItem>
);

Step.propTypes = {
  idx: PropTypes.number,
  title: PropTypes.string,
  expanded: PropTypes.number,
  handleToggle: PropTypes.func,
  content: PropTypes.node,
  status: PropTypes.string,
};

export default Step;
