'use client';

import { FormWrapper } from '@/components/form';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { GroceryForm } from './grocery-form';
import { GroceryList } from './grocery-list';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const GroceryTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Add' {...a11yProps(0)} />
          <Tab label='View' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {value === 0 && (
          <FormWrapper
            title='Grocery List'
            titleConfig={{
              variant: 'h3',
              gutterBottom: true,
            }}
            containerConfig={{
              sx: {
                display: 'flex',
                justifyContent: 'center',
              },
            }}
            paperConfig={{
              sx: {
                p: 2,
              },
            }}
            blockConfig={{
              sx: {
                p: 2,
              },
            }}>
            <GroceryForm showReset={true} />
          </FormWrapper>
        )}
        {value === 1 && <GroceryList />}
      </Box>
    </Box>
  );
};
