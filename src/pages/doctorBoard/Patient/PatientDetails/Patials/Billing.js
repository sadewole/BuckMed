import React, { useState } from 'react';
import Header from './Billings/Header';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles,
} from '@material-ui/core';
import General from './Billings/General';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

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
