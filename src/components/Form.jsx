import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardBody, Form, FormGroup, InputGroup, TextInput, Flex, FlexItem } from '@patternfly/react-core';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';

import styles from './Form.module.css';
import { PIPELINES, TTL_OPTIONS, DEFAULT_TTL_OPTION } from '../constants';
import BranchDropdown from './BranchDropdown';
import { getMeteorsFromLocalStorage, setMeteorsToLocalStorage } from '../localstorage';
import Dropdown from './Dropdown';
import Select from './Select';
import { useBranches } from '../hooks/swr';
import { useAlerts } from '../contexts/Alerts';

const MeteorForm = () => {
  const [url, setUrl] = useState('');
  const [ref, setRef] = useState('HEAD');
  const [ttl, setTtl] = useState(null);
  const [pipelines, setPipelines] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pristine, setPristine] = useState(true);
  const router = useRouter();
  const { isError: repoFetchError } = useBranches(url);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, addAlert] = useAlerts();

  const handleUrlChange = (v) => {
    setUrl(v);
    setPristine(false);
  };

  const handleTtlChange = (v) => {
    setTtl(TTL_OPTIONS[v]);
  };

  const handleSubmit = async (event) => {
    if (validate() === 'error' || pristine) {
      return;
    }
    setIsSubmitted(true);
    event.preventDefault();

    try {
      const response = await fetch('/api/meteors', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify({
          url: url.replace(/\.git$/g, ''),
          ref,
          pipelines: pipelines.map((p) => p.value),
          ttl,
        }),
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.message, { cause: body });
      }
      setMeteorsToLocalStorage([...getMeteorsFromLocalStorage(), body.metadata.name]);
      router.push(`/order/${body.metadata.name}`);
    } catch (error) {
      setIsSubmitted(false);
      console.error(error);
      addAlert({ variant: 'danger', title: error.cause.message });
    }
  };

  const validate = () => {
    if (url) {
      return url.match(/https?:\/\/.*/g) && !repoFetchError ? 'success' : 'error';
    } else {
      return pristine ? 'default' : 'error';
    }
  };

  return (
    <div className={styles.wrap}>
      <Card className={styles.card}>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup
              helperTextInvalid="Value must be a valid repository URL"
              helperTextInvalidIcon={<ExclamationCircleIcon />}
              fieldId="url"
              validated={validate()}
            >
              <InputGroup>
                <TextInput
                  type="text"
                  value={url}
                  validated={validate()}
                  required={true}
                  placeholder="https://github.com/org/repo"
                  onChange={handleUrlChange}
                  aria-label="repository url"
                  id="url"
                />
                <Button variant="primary" type="submit" isLoading={isSubmitted} isDisabled={pristine || validate() !== 'success'}>
                  {(!isSubmitted && <ArrowRightIcon />) || <>Submitting</>}
                </Button>
              </InputGroup>
            </FormGroup>
            {!pristine && (
              <Flex>
                <FlexItem>
                  <label className={styles.label} htmlFor="branch">
                    Branch
                  </label>
                  <BranchDropdown id="branch" className={styles.dropdown} repoUrl={url} onSelect={setRef} />
                </FlexItem>
                <FlexItem>
                  <label className={styles.label} htmlFor="ttl">
                    Expiration
                  </label>
                  <Dropdown
                    id="ttl"
                    className={styles.dropdown}
                    initialValue={DEFAULT_TTL_OPTION}
                    dropdownItems={Object.keys(TTL_OPTIONS)}
                    onSelect={handleTtlChange}
                  />
                </FlexItem>
                <FlexItem grow={{ default: 'grow' }}>
                  <label className={styles.label} htmlFor="pipelines">
                    Components
                  </label>
                  <Select onSelect={setPipelines} id="pipelines" options={PIPELINES} />
                </FlexItem>
              </Flex>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default MeteorForm;
