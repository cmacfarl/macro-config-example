import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, RadioGroup, useConfig } from '@forge/react';

const defaultConfig = {color: 'purple'};

const options = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue' },
  { name: 'color', value: 'yellow', label: 'Yellow' },
  { name: 'color', value: 'green', label: 'Green' },
  { name: 'color', value: 'black', label: 'Black' },
];

const Config = () => {
  return (
    <>
    <RadioGroup options={options} value="red"/>
    </>
  );
};

const App = () => {

  const config = useConfig() || defaultConfig;

  return (
    <>
      <Text>Color: {config.color}</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
ForgeReconciler.addConfig(<Config />);