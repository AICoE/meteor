import React, { useState, useEffect } from 'react';
import { Select as PfSelect, SelectOption } from '@patternfly/react-core';
import PropTypes from 'prop-types';

import styles from './Select.module.scss';

const Select = ({ onSelect, options }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [parsedOptions, setParsedOptions] = useState([]);

  useEffect(() => {
    setParsedOptions(
      options.map((option) => ({
        ...option,
        toString: () => option.label,
        compareTo: (other) => other.value === option.value,
      }))
    );
  }, [options]);

  useEffect(() => {
    setSelected(parsedOptions.filter((o) => o.default));
  }, [parsedOptions]);

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  const handleSelect = (_, selection) => {
    if (selected.map((s) => s.value).includes(selection.value)) {
      setSelected(selected.filter((s) => s.value !== selection.value));
    } else {
      setSelected([...selected, selection]);
    }
  };

  return (
    <PfSelect
      className={styles.select}
      onSelect={handleSelect}
      position="right"
      isOpen={open}
      variant="checkbox"
      selections={selected}
      onToggle={setOpen}
    >
      {parsedOptions.map((option, idx) => (
        <SelectOption key={`${option.value}_${idx}`} value={option} description={option.description} />
      ))}
    </PfSelect>
  );
};
Select.propTypes = {
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, description: PropTypes.string, label: PropTypes.string })),
};

export default Select;
