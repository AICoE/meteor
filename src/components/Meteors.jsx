import React, { useState } from 'react';
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
  KebabToggle,
  Skeleton,
} from '@patternfly/react-core';
import Link from 'next/link';

import { useMeteors, prefetch } from '../swr';
import PhaseIcon from './PhaseIcon';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';

import { PIPELINES } from '../constants';

const MeteorTile = ({ name, content, isLoading, phase, pipelines }) => {
  const [isOpen, setIsOpen] = useState(false);
  const launchButtons = (pipelines || []).map((p) => ({ ...p, label: PIPELINES[p.name]?.label || p.name }));

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
          <DataListAction
            aria-labelledby="selectable-actions-item2 selectable-actions-action2"
            id="selectable-actions-action2"
            aria-label="Actions"
            isPlainButtonAction
          >
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
};

const Meteors = () => {
  const { data: meteors } = useMeteors();

  return (
    <DataList>
      {meteors
        ? meteors.map((m) => (
            <MeteorTile
              key={m.metadata.uid}
              name={m.metadata.name}
              content={`${m.spec.url}@${m.spec.ref}`}
              pipelines={m.status.pipelines}
              phase={m.status.phase}
            />
          ))
        : [...Array(5)].map((_, i) => <MeteorTile key={`skeleton-${i}`} isLoading />)}
    </DataList>
  );
};

export default Meteors;
