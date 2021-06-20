import React, { useState } from 'react';
import {
  Bullseye,
  Button,
  Card,
  CardBody,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  TextInput,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import Head from 'next/head';

import { LogoCard } from '../components/LogoCard';

const FormCard = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    setIsLoading(true);
    console.log(value);
    event.preventDefault();
  };

  return (
    <Card isLarge isHoverable>
      <CardBody>
        <Form isHorizontal>
          <Flex alignItems={{ default: 'alignItemsCenter' }}>
            <FlexItem>
              <FormGroup label="Repository URL" className="label" fieldId="url">
                <TextInput value={value} type="text" onChange={setValue} aria-label="text input example" id="url" />
              </FormGroup>
            </FlexItem>
            <FlexItem>
              <Button variant="primary" isLoading={isLoading} onClick={handleSubmit}>
                {(!isLoading && <ArrowRightIcon />) || <>Sumbitting</>}
              </Button>
            </FlexItem>
          </Flex>
        </Form>
      </CardBody>
    </Card>
  );
};

const Index = () => (
  <Bullseye height="100%" className="cover">
    <Head>
      <title>Meteor</title>
    </Head>
    <Flex direction={{ default: 'column' }} alignItems={{ default: 'alignItemsCenter' }} className="flex-spacing__vertical">
      <Flex className="flex-spacing__horizontal">
        <FlexItem>
          <LogoCard />
        </FlexItem>
        <FlexItem>
          <FormCard />
        </FlexItem>
      </Flex>
      <FlexItem>
        <TextContent className="text-content">
          <Text component={TextVariants.h1}>Collecting. Building. Deploying. Distibuting. Automating.</Text>
          <Text component={TextVariants.p}>
            Welcome and join us in a simpler world. Take sharing of your data science repositories to a next level. Simply paste an URL to your
            repository and get going!
          </Text>
        </TextContent>
      </FlexItem>
    </Flex>
  </Bullseye>
);

export default Index;
