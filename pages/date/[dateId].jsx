import React from 'react';
import { useRouter } from 'next/router';

import Store from '../../store';
import DateDetails from '../../scenes/DateDetails/DateDetails';

export default function DatePage() {
  const store = Store.useStore();
  const dateObjs = store.get('dates');

  const router = useRouter();
  const { dateId } = router.query;
  console.log('test', dateObjs, dateId, router.query);
  const dateObj = dateObjs.find(date => date.id === parseInt(dateId, 10));

  return <DateDetails dateId={dateId} dateObj={dateObj} />;
}
