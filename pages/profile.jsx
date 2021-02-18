import React from 'react';
import { useRouter } from 'next/router';

import Store from '../store';
import UserDetails from '../scenes/UserDetails/UserDetails';

export default function DatePage() {
  const store = Store.useStore();
  const user = store.get('user');

  return <UserDetails userObj={user.dataValues} isProfile />;
}
