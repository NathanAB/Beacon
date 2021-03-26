import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import Store from '../../../store';

import Spinner from '../../../components/Spinner/Spinner';
import { getUsersAdmin, updateUserAdmin } from '../../../api';
import MaterialTableToggle from '../../../components/AppBar/MaterialTableToggle/MaterialTableToggle';

const UsersTab = () => {
  const store = Store.useStore();
  const [isUpdatingUser, setUpdatingUser] = useState(false);
  const user = store.get('user');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsersAdmin();
      setUsers(allUsers);
    };
    if (user && !users.length) {
      fetchUsers();
    }
  }, [user]);

  const toggleField = ({ u, field }) => async () => {
    // eslint-disable-next-line no-param-reassign
    setUpdatingUser(true);
    try {
      await updateUserAdmin({ email: u.email, userData: { [field]: !u[field] } });
      const allUsers = await getUsersAdmin();
      setUsers(allUsers);
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setUpdatingUser(false);
    }
  };

  if (!users || !users.length) {
    return <Spinner />;
  }

  return (
    <>
      {isUpdatingUser && <Spinner />}
      <MaterialTable
        style={{ marginTop: '20px' }}
        title="Users"
        columns={[
          {
            title: 'User ID',
            field: 'id',
          },
          {
            title: 'Email',
            field: 'email',
          },
          {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'Is Creator?',
            field: 'isCreator',
            type: 'boolean',
            render: u => (
              <MaterialTableToggle
                data={u.isCreator}
                onClick={toggleField({ u, field: 'isCreator' })}
              />
            ),
          },
          {
            title: 'Is New?',
            field: 'isNew',
            type: 'boolean',
            render: u => (
              <MaterialTableToggle data={u.isNew} onClick={toggleField({ u, field: 'isNew' })} />
            ),
          },
          {
            title: 'Created',
            field: 'createdAt',
          },
        ]}
        data={users}
        options={{
          sorting: true,
        }}
      />
    </>
  );
};

export default UsersTab;
