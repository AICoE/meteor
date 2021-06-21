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

export const Step = ({ idx, title, expanded, status, handleToggle, content }) => (
  <AccordionItem>
    <AccordionToggle
      onClick={() => {
        handleToggle(idx);
      }}
      isExpanded={expanded === idx}
      id={`toggle-${idx}`}
    >
      {status && statusIcon[status]} {title}
    </AccordionToggle>
    <AccordionContent isHidden={expanded !== idx}>{content ? content : 'This step has not started yet.'}</AccordionContent>
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
