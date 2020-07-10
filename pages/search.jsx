import React from 'react';
import Head from 'next/head';
import { CircularProgress, Box } from '@material-ui/core';

import Store from '../store';
import Search from '../scenes/Search/Search';
import { useFilters } from '../utils';

export const getMeta = filters => {
  const filter = filters.find(f => {
    if (f.type === 'neighborhood' || f.type === 'tag') {
      return true;
    }
    return false;
  });

  const descString = filter?.type === 'tag' ? filter?.value?.toLowerCase() : filter?.value;

  const titleString = filter?.type === 'tag' ? `${filter?.value} Washington DC` : filter?.value;

  return {
    title: titleString || '',
    description: descString || '',
  };
};

export default function SearchPage() {
  const store = Store.useStore();
  const [filters] = useFilters();
  const dates = store.get('dates');
  const { title, description } = getMeta(filters);

  return (
    <>
      <Head>
        <title>{title || 'Washington DC'} Date Ideas | Beacon</title>
        <meta
          name="description"
          content={`Discover fun and unique ${description} date ideas in Washington DC crafted by trusted locals.`}
        />
      </Head>
      {dates.length ? (
        <Search />
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="primary" />
        </Box>
      )}
    </>
  );
}
