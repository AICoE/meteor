import React from 'react';
import PropTypes from 'prop-types';
import CodeBranchIcon from '@patternfly/react-icons/dist/js/icons/code-branch-icon';

import Dropdown from './Dropdown';
import { useBranches } from '../hooks/swr';
import { DEFAULT_BRANCH_STRING } from '../constants';

const BranchDropdown = ({ id, onSelect, className, repoUrl = '' }) => {
  const { data, isError } = useBranches(repoUrl);

  return (
    <Dropdown
      id={id}
      className={className}
      onSelect={onSelect}
      toggleIcon={<CodeBranchIcon />}
      initialValue={DEFAULT_BRANCH_STRING}
      dropdownItems={data && !isError && data.map((branch) => branch.name)}
    />
  );
};

BranchDropdown.propTypes = {
  id: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  repoUrl: PropTypes.string,
  className: PropTypes.string,
};

export default BranchDropdown;
