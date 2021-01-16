import React from 'react';
import { useRouter } from 'next/router';

import Store from '../../store';
import UserDetails from '../../scenes/UserDetails/UserDetails';

export default function DatePage() {
  const store = Store.useStore();
  const users = store.get('users');

  const router = useRouter();
  const { userId } = router.query;
  const userObj = users.find(u => u.id === parseInt(userId, 10));

  return <UserDetails userId={userId} userObj={userObj} />;
}
