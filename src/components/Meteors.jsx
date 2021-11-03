import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DataList,
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  DropdownSeparator,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Flex,
  FlexItem,
  KebabToggle,
  Skeleton,
  Switch,
  Title,
} from '@patternfly/react-core';
import Link from 'next/link';

import { useMeteors, prefetch } from '../hooks/swr';
import PhaseIcon from './PhaseIcon';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import MeteorIcon from '@patternfly/react-icons/dist/js/icons/meteor-icon';

import { PIPELINES } from '../constants';
import { setMeteorsToLocalStorage, getMeteorsFromLocalStorage } from '../localstorage';

const MeteorTile = ({ name, content, isLoading, phase, pipelines, localMeteors, setLocalMeteors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const launchButtons = (pipelines || []).map((p) => ({ ...p, label: PIPELINES[p.name]?.label || p.name }));

  const handleToggleLocalMeteors = () => {
    if (localMeteors.includes(name)) {
      setLocalMeteors(localMeteors.filter((m) => m !== name));
    } else {
      setLocalMeteors([...localMeteors, name]);
    }
  };

  return (
    <DataListItem id={name}>
      {isLoading ? (
        <Skeleton width="250px" height="6rem" />
      ) : (
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell key="phase" isIcon>
                <PhaseIcon phase={phase} />
              </DataListCell>,
              <DataListCell key="name">{name}</DataListCell>,
              <DataListCell key="url" width={2}>
                {content}
              </DataListCell>,
            ]}
          />
          <DataListAction aria-label="Actions" isPlainButtonAction>
            <Dropdown
              isPlain
              onMouseEnter={() => prefetch(`/api/meteor/${name}`)}
              position={DropdownPosition.right}
              isOpen={isOpen}
              onSelect={() => setIsOpen(!isOpen)}
              toggle={<KebabToggle onToggle={setIsOpen} />}
              dropdownItems={[
                <Link key="details" href={`/order/${name}`}>
                  <DropdownItem>Details</DropdownItem>
                </Link>,
                <DropdownItem component="button" key="favorite" onClick={handleToggleLocalMeteors}>
                  {localMeteors.includes(name) ? 'Remove from' : 'Add to'} your Meteors
                </DropdownItem>,
                <DropdownSeparator key="separator" />,
                ...launchButtons.map((b) => (
                  <DropdownItem key={b.name} variant="link" component="a" target="_blank" href={b.url} isDisabled={b.ready !== 'True'}>
                    {b.label} <ExternalLinkAltIcon />
                  </DropdownItem>
                )),
              ]}
            />
          </DataListAction>
        </DataListItemRow>
      )}
    </DataListItem>
  );
};

MeteorTile.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  isLoading: PropTypes.bool,
  phase: PropTypes.string,
  pipelines: PropTypes.array,
  localMeteors: PropTypes.arrayOf(PropTypes.string),
  setLocalMeteors: PropTypes.func,
};

const Meteors = () => {
  const { data: meteors, isLoading } = useMeteors();
  const [localMeteors, setLocalMeteors] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    setMeteorsToLocalStorage(localMeteors);
  }, [localMeteors]);

  useEffect(() => {
    setLocalMeteors(getMeteorsFromLocalStorage());
  }, []);

  const emptyState = (
    <EmptyState>
      <EmptyStateIcon icon={MeteorIcon} />
      <Title headingLevel="h4" size="lg">
        No meteors found
      </Title>
      <EmptyStateBody>There are no meteors available to be displayed</EmptyStateBody>
    </EmptyState>
  );

  const meteorsToDisplay = (meteors || []).filter((m) => (toggle ? localMeteors.includes(m.metadata.name) : true));

  return (
    <Flex direction={{ default: 'column' }}>
      <Flex>
        <FlexItem>
          <Title headingLevel="h2">Available meteors</Title>
        </FlexItem>
        <FlexItem>
          <Switch onChange={setToggle} label="Showing your Meteors only" labelOff="Showing all Meteors" isChecked={toggle} />
        </FlexItem>
      </Flex>
      <FlexItem>
        <DataList style={{ minHeight: '500px', borderTopWidth: 0 }}>
          {isLoading
            ? [...Array(5)].map((_, i) => <MeteorTile key={`skeleton-${i}`} isLoading />)
            : meteorsToDisplay.length > 0
            ? meteorsToDisplay.map((m) => (
                <MeteorTile
                  key={m.metadata.uid}
                  name={m.metadata.name}
                  content={`${m.spec.url}@${m.spec.ref}`}
                  pipelines={m.status.pipelines}
                  phase={m.status.phase}
                  localMeteors={localMeteors}
                  setLocalMeteors={setLocalMeteors}
                />
              ))
            : emptyState}
        </DataList>
      </FlexItem>
    </Flex>
  );
};

export default Meteors;
