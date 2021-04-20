import React from 'react';

import Store from '../store';
import UserDetails from '../scenes/UserDetails/UserDetails';

export default function ProfilePage() {
  const store = Store.useStore();
  const user = store.get('user');

  return <UserDetails userObj={user.dataValues} isProfile />;
}
