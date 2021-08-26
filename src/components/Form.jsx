import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardBody, Checkbox, Form, FormGroup, InputGroup, TextInput } from '@patternfly/react-core';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';

import styles from './Form.module.css';
import { PIPELINES } from '../constants';
import BranchDropdown from './BranchDropdown';

const MeteorForm = () => {
  const [url, setUrl] = useState('');
  const [ref, setRef] = useState('HEAD');
  const [pipelines, setPipelines] = useState(PIPELINES);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pristine, setPristine] = useState(true);
  const router = useRouter();

  const handleUrlChange = (v) => {
    setUrl(v);
    setPristine(false);
  };

  const handlePipelineCheck = (_, { target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setPipelines({ ...pipelines, [name]: { ...pipelines[name], value } });
  };

  const handleSubmit = async (event) => {
    if (validate() === 'error' || pristine) {
      return;
    }
    setIsSubmitted(true);
    event.preventDefault();

    const response = await fetch('/api/meteors', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        url,
        ref,
        pipelines: Object.entries(pipelines)
          .filter(([, v]) => v.value)
          .map(([k]) => k),
      }),
    });

    const body = await response.json();
    router.push(`/order/${body.metadata.name}`);
  };

  const validate = () => {
    if (url) {
      return url.match(/https?:\/\/.*/g) ? 'success' : 'error';
    } else {
      return pristine ? 'default' : 'error';
    }
  };

  return (
    <div className={styles.wrap}>
      <Card isHoverable className={styles.card}>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup
              helperTextInvalid="Value must be an URL"
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
                <BranchDropdown className={styles.branch} repoUrl={url} onSelect={setRef} />
                <Button variant="primary" type="submit" isLoading={isSubmitted} isDisabled={pristine || validate() !== 'success'}>
                  {(!isSubmitted && <ArrowRightIcon />) || <>Submitting</>}
                </Button>
              </InputGroup>
            </FormGroup>
            <FormGroup isInline className={styles.test} label="Components">
              {Object.entries(pipelines).map(([k, v]) => (
                <Checkbox key={k} id={k} label={v.label} name={k} isChecked={v.value} onChange={handlePipelineCheck} />
              ))}
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default MeteorForm;
