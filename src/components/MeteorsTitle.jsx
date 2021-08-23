import React from 'react';
import { Title } from '@patternfly/react-core';
import { useMeteors } from '../swr';

const MeteorsTitle = () => {
  const { data: meteors } = useMeteors();

  if (meteors && meteors.length === 0) {
    return null;
  }

  return <Title headingLevel="h2">Available meteors</Title>;
};

export default MeteorsTitle;
