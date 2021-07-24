import React from 'react';
import { LoginHeader, LoginMainHeader } from '@patternfly/react-core';

export const LogoCard = () => (
  <>
    <LoginHeader headerBrand={<img src="/logo192.png" width={192} height={192} />} />
    <LoginMainHeader className="pf-c-login__header" color="while" title="Project Meteor." />
  </>
);

export default LogoCard;
