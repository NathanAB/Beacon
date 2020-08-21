import React from 'react';
import ReactGA from 'react-ga';

import Store from '../../../store';
import styles from './FilterBar.module.css';
import Paper from '../../../components/Paper/Paper';
import Button from '../../../components/Button/Button';
import Chip from '../../../components/Chip/Chip';
import cn from '../../../utils/cn';
import { useFilters, filterDates } from '../../../utils';

const FILTER_MAP = {
  Neighborhood: 'neighborhood',
  Vibe: 'tag',
  Cost: 'cost',
  Duration: 'duration',
};

export default function FilterBar() {
  const store = Store.useStore();
  const isFilterBarExpanded = store.get('isFilterBarExpanded');
  const setIsFilterBarExpanded = store.set('isFilterBarExpanded');
  const toggleFilterBar = val => {
    ReactGA.event({
      category: 'Interaction',
      action: 'Toggle Filter Bar',
    });
    setIsFilterBarExpanded(val);
  };
  const neighborhoods = store.get('neighborhoods').map(n => n.name);
  const tags = store.get('tags').map(t => t.name);
  const durations = store.get('durations');
  const costs = store.get('costs');
  const dateObjs = store.get('dates');

  const [filters, setFilters] = useFilters();
  const searchResultsLength = filterDates(dateObjs, filters).length;
  const setFiltersWrapper = newFilters => {
    store.set('lastFilters')(newFilters);
    setFilters(newFilters);
  };

  const deleteFilter = filterVal => {
    const newFilters = filters.filter(currFilter => currFilter.value !== filterVal);
    setFiltersWrapper(newFilters);
  };

  const toggleFilter = (type, value, isToggleOn) => {
    let newFilters;

    if (isToggleOn) {
      newFilters = filters.concat({ type, value });
      ReactGA.event({
        category: 'Interaction',
        action: 'Toggle Filter On',
        label: value,
      });
    } else {
      newFilters = filters.filter(f => value !== f.value);
      ReactGA.event({
        category: 'Interaction',
        action: 'Toggle Filter Off',
        label: value,
      });
    }
    setFiltersWrapper(newFilters);
  };

  const renderFilterSection = (filterType, filterValues) => (
    <div className={styles.filterSection}>
      <h6 className={styles.sectionTitle}>{filterType}</h6>
      <div className={styles.filterChips}>
        {filterValues.map(f => {
          const isToggled = filters.some(filter => filter.value === f);
          const wouldCauseEmptySearch =
            !isToggled &&
            filterDates(dateObjs, [...filters, { type: FILTER_MAP[filterType], value: f }])
              .length === 0;
          return (
            <div className={styles.chipContainer} key={f}>
              <Chip
                variant={isToggled ? Chip.VARIANTS.PRIMARY : Chip.VARIANTS.SECONDARY}
                onClick={() => toggleFilter(FILTER_MAP[filterType], f, !isToggled)}
                disabled={wouldCauseEmptySearch}
              >
                {f}
              </Chip>
            </div>
          );
        })}
      </div>
    </div>
  );

  const expandedFilters = () => (
    <div className={cn(styles.outerContainer, styles.expanded)}>
      <Paper withShadow>
        <div className={styles.innerContainer}>
          {renderFilterSection('Neighborhood', neighborhoods)}
          {renderFilterSection('Vibe', tags)}
          {renderFilterSection('Cost', costs)}
          {renderFilterSection('Duration', durations)}
          <div className={styles.buttonRow}>
            <span>
              {searchResultsLength} result{searchResultsLength !== 1 && 's'}
            </span>
            <Button
              variant={Button.VARIANTS.PRIMARY}
              size={Button.SIZES.SMALL}
              onClick={() => toggleFilterBar(false)}
            >
              Save filters
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );

  if (isFilterBarExpanded) {
    return expandedFilters();
  }

  return (
    <div className={styles.outerContainer}>
      <Paper withShadow>
        <div className={styles.innerContainer}>
          {filters.length ? <h6>Filtered by:</h6> : <h6>No filters chosen.</h6>}
          <div className={styles.filterChips}>
            {filters.map(filter => (
              <div className={styles.chipContainer} key={filter.value}>
                <Chip variant={Chip.VARIANTS.PRIMARY} onDelete={() => deleteFilter(filter.value)}>
                  {filter.value}
                </Chip>
              </div>
            ))}
          </div>
          <Button
            variant={Button.VARIANTS.PRIMARY}
            size={Button.SIZES.SMALL}
            onClick={() => toggleFilterBar(true)}
          >
            Add filters
          </Button>
        </div>
      </Paper>
    </div>
  );
}
