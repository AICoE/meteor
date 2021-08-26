import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, DropdownToggle } from '@patternfly/react-core';
import CodeBranchIcon from '@patternfly/react-icons/dist/js/icons/code-branch-icon';
import { useBranches } from '../swr';

const DEFAULT_BRANCH_STRING = 'default';

const BranchDropdown = ({ onSelect, className, repoUrl = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(DEFAULT_BRANCH_STRING);
  const { data } = useBranches(repoUrl);

  const handleSelect = (event) => {
    setValue(event.target.value);
    onSelect(event.target.value);
    setIsOpen(!isOpen);
  };
  const handleToggle = (v) => {
    setIsOpen(v);
  };

  return (
    <Dropdown
      className={className}
      onSelect={handleSelect}
      toggle={
        <DropdownToggle onToggle={handleToggle} isDisabled={!data}>
          <CodeBranchIcon /> {value}
        </DropdownToggle>
      }
      isOpen={isOpen}
      dropdownItems={
        data &&
        data.map((branch) => (
          <DropdownItem key={branch.name} value={branch.name} component="button">
            {branch.name}
          </DropdownItem>
        ))
      }
    />
  );
};

BranchDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  repoUrl: PropTypes.string,
  className: PropTypes.string,
};

export default BranchDropdown;
