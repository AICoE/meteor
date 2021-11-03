import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown as PfDropdown, DropdownItem, DropdownToggle } from '@patternfly/react-core';

const Dropdown = ({ id, onSelect, className, initialValue = '', dropdownItems = [], toggleIcon = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSelect = (event) => {
    setValue(event.target.value);
    onSelect(event.target.value);
    setIsOpen(!isOpen);
  };
  const handleToggle = (v) => {
    setIsOpen(v);
  };

  return (
    <PfDropdown
      id={id}
      className={className}
      onSelect={handleSelect}
      toggle={
        <DropdownToggle onToggle={handleToggle} isDisabled={dropdownItems.length === 0}>
          {toggleIcon} {value}
        </DropdownToggle>
      }
      isOpen={isOpen}
      dropdownItems={dropdownItems.map((i) => (
        <DropdownItem key={i} value={i} component="button">
          {i}
        </DropdownItem>
      ))}
    />
  );
};

Dropdown.propTypes = {
  id: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
  initialValue: PropTypes.any,
  dropdownItems: PropTypes.array,
  toggleIcon: PropTypes.node,
};

export default Dropdown;
