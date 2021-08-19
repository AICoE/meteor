import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardBody, Form, FormGroup, InputGroup, TextInput } from '@patternfly/react-core';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';

import styles from './Form.module.css';

const MeteorForm = () => {
  const [value, setValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pristine, setPristine] = useState(true);
  const router = useRouter();

  const handleValueChange = (v) => {
    setValue(v);
    setPristine(false);
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
      body: JSON.stringify({ url: value, ref: 'HEAD' }),
    });

    const body = await response.json();
    router.push(`/order/${body.metadata.name}`);
  };

  const validate = () => {
    if (value) {
      return value.match(/https?:\/\/.*/g) ? 'success' : 'error';
    } else {
      return pristine ? 'default' : 'error';
    }
  };

  return (
    <Card isHoverable className={styles.card}>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup helperTextInvalid="Value must be an URL" helperTextInvalidIcon={<ExclamationCircleIcon />} fieldId="url" validated={validate()}>
            <InputGroup>
              <TextInput
                type="text"
                value={value}
                validated={validate()}
                required={true}
                placeholder="https://github.com/org/repo"
                onChange={handleValueChange}
                aria-label="repository url"
                id="url"
              />
              <Button variant="primary" type="submit" isLoading={isSubmitted} isDisabled={pristine || validate() !== 'success'}>
                {(!isSubmitted && <ArrowRightIcon />) || <>Submitting</>}
              </Button>
            </InputGroup>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default MeteorForm;
