import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Store from '../../store';

import Constants from '../../constants';
import DatesTab from './DatesTab/DatesTab';
import UsersTab from './UsersTab/UsersTab';

function Admin() {
  const store = Store.useStore();
  const user = store.get('user');

  if (!user) {
    return <a href={Constants.API.LOGIN_GOOGLE}>Login</a>;
  }

  return (
    <Box margin="20px">
      <Tabs>
        <TabList>
          <Tab>
            <h6 className="text-lg font-bold">Dates</h6>
          </Tab>
          <Tab>
            <h6 className="text-lg font-bold">Users</h6>
          </Tab>
        </TabList>

        <TabPanel>
          <DatesTab />
        </TabPanel>
        <TabPanel>
          <UsersTab />
        </TabPanel>
      </Tabs>
    </Box>
  );
}

export default Admin;
