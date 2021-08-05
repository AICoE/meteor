import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Bullseye, Button, Card, Brand, CardBody, Form, FormGroup, InputGroup, TextInput } from '@patternfly/react-core';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';
import Head from 'next/head';

const Index = () => {
  const [value, setValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pristine, setPristine] = useState(true);
  const router = useRouter();

  const handleValueChange = (v) => {
    setValue(v);
    setPristine(false);
  };

  const handleSubmit = async () => {
    if (validate() === 'error' || pristine) {
      return;
    }
    setIsSubmitted(true);

    const response = await fetch('/api/meteors', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({ url: value, ref: 'main', ttl: 10000 }),
    });
    console.log(response);

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
    <Bullseye height="100%" className="cover">
      <Head>
        <title>Meteor</title>
      </Head>
      <Card isLarge isHoverable>
        <CardBody>
          <Form isHorizontal>
            <FormGroup
              label={<Brand src="/logo192.png" alt="PatternFly logo" style={{ height: '1.5em' }} />}
              helperTextInvalid="Value must be an URL"
              helperTextInvalidIcon={<ExclamationCircleIcon />}
              className="label"
              fieldId="url"
              validated={validate()}
            >
              <InputGroup>
                <TextInput
                  type="text"
                  value={value}
                  validated={validate()}
                  required={true}
                  placeholder="https://github.com/org/repo"
                  onChange={handleValueChange}
                  aria-label="text input example"
                  id="url"
                  style={{ minWidth: '20vw', verticalAlign: 'middle' }}
                />
                <Button variant="primary" isLoading={isSubmitted} onClick={handleSubmit} isDisabled={pristine || validate() !== 'success'}>
                  {(!isSubmitted && <ArrowRightIcon />) || <>Submitting</>}
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Bullseye>
  );
};

export default Index;
