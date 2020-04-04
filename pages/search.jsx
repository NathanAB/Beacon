import React from 'react';
import Head from 'next/head';

import Search from '../scenes/Search/Search';
import { useFilters } from '../utils';

export default function SearchPage() {
  const [filters] = useFilters();
  let titleFilter = '';

  filters.some(filter => {
    if (filter.type === 'neighborhood' || filter.type === 'tag') {
      titleFilter = `| ${filter.value}`;
      return true;
    }
    return false;
  });

  return (
    <>
      <Head>
        <title>Beacon | Washington DC {titleFilter} Date Ideas</title>
        <meta
          name="description"
          content={`Discover fun and unique ${titleFilter} DC date ideas tailored to your preferences.`}
        />
      </Head>
      <Search />
    </>
  );
}
