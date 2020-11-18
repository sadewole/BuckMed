import React, { useState } from 'react';
import Header from './Header';
import { Box, Container, Divider, Tab, Tabs } from '@material-ui/core';
import General from './General';

const Billing = () => {
  const [currentTab, setCurrentTab] = useState('general');

  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'prepaid', label: 'Prepaid' },
    { value: 'transaction', label: 'Transaction' },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Container maxWidth='lg'>
      <Header />
      <Box mt={3}>
        <Tabs
          onChange={handleTabsChange}
          scrollButtons='auto'
          value={currentTab}
          variant='scrollable'
          indicatorColor='primary'
          textColor='primary'
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Box>
      <Divider />
      <Box mt={3}>{currentTab === 'general' && <General />}</Box>
    </Container>
  );
};

export default Billing;
